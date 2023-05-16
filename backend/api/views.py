import time
import random
from .models import *
from .serializers import *
#from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
import itertools
from django.contrib.auth import authenticate, login
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.core import serializers
from rest_framework_simplejwt.tokens import RefreshToken

 

@api_view(['POST'])
def Login(request):
    if request.method == "POST":
        data = request.data
        username = data["username"]
        password = data["password"]

        try: 
            user = User.objects.get(username=username)
            if user and check_password(password, user.password):
                serializer = UserSerializer(instance=user, data=request.data)
                if serializer.is_valid():
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'access_token': str(refresh.access_token),
                        'refresh_token': str(refresh)
                })
            else:
                return JsonResponse({'error': 'Username or password are wrong.'}, status=400)
        except:
            return JsonResponse({'error': 'Username does not exist. You must sign up first'}, status=400)
    

@api_view(['POST'])
def Register(request):
    
    if request.method == 'POST':
        data = request.data
        username = data["username"]
        password = data["password"]
        password2 = data["password2"]

        try:
            user = User.objects.get(username=username)
            return JsonResponse({'error': "Username already exist."}, status=400)     
        except:
            try:
                validate_password(password)
                validate_password(password2)
                if password == password2:
                    data['password'] = make_password(data['password'])
                    #data['password2'] = make_password(data['password2']) 
                    serializer = UserSerializer(data=data)
                    #userProfile = UserProfile(user=user, gender='male', yob='1994', height='1.88', weight='85', pal='Active', halal=False, diary=False, eggs=False, fish=False, cousine='Spain')
                    if serializer.is_valid():
                        serializer.save()
                        user = User.objects.get(username=username)
                        profile = UserProfile(user = user, gender='male', yob=1994, height=1.88, weight=85, pal='Active', halal=False, diary=False, eggs=False, fish=False, country='Spain', age=29, bmi=1, bmr=1, energy_intake=1)
                        profile.save()
                        refresh = RefreshToken.for_user(user)
                        return Response({
                            'access_token': str(refresh.access_token),
                            'refresh_token': str(refresh)
                        })
                else:
                    return JsonResponse({'error': "Passowrd1 and password2 are not the same."}, status=400)
            except:
                return JsonResponse({'error': "Invalid password"}, status=400)

    
@api_view(['GET'])
def Users(request):
    
    if request.method == 'GET':
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def UsersProfile(request):
    
    if request.method == 'GET':
        queryset = UserProfile.objects.all()
        serializer = UserProfileSerializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT'])
def IdUserProfile(request, pk):
    
    if request.method == 'GET':
        user = UserProfile.objects.get(user = pk)
        serializer = UserProfileSerializer(instance=user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        user = User.objects.get(id = pk)
        userProfile = UserProfile.objects.get(user = user)
        serializer = UpdateUserProfileSerializer(instance=userProfile, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
    elif request.method == 'POST':
        
        user = User.objects.get(id = pk)
        data = request.data

        serializer = RegisterUserProfileSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    

@api_view(['GET'])
def NPs(request, pk):

    user =  UserProfile.objects.get(user=pk)
    energy_intake = user.energy_intake
    meals = Meal.objects.filter(country = user.country).all()
    #print(len(meals))
    
    meal_info_dict = get_meal_info_dict(meals)
    #print(meal_info_dict)

    allergy_filters = {
    'pork': user.halal,
    'diary': user.diary,
    'eggs': user.eggs,
    'fish': user.fish,
    }

    for allergy, is_filtered in allergy_filters.items():
        if is_filtered:
            for i in range(1, 6):
                meals = meals.exclude(**{f'dish_{i}__{allergy}': True})
    

    all_list = [meals.filter(type=meal_type) for meal_type in ('Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner')]

    # combination of all possible NPs
    r = list(itertools.product(*all_list))
    res = random.choices(r, k=20000)
    print(len(res)) 

    
    step1_start = time.time()
    # Sum the NPs characteristics
    sum_kcal,sum_fat,sum_frandveg,dishes_div = sum_NPs_characteristics(res, meal_info_dict)
    step1_end = time.time()
    step1_elapsed_time = step1_end-step1_start

    step2_start = time.time()
    # Score the NPs
    appropriateness_distance=score_NPs(energy_intake, res, sum_kcal, sum_fat, sum_frandveg, dishes_div)

    # Sort appropriateness_distance
    #appropriateness_distance_list = sorted(appropriateness_distance)
    #print("########")
    #print("sorted appropriateness distance")
    #print(appropriateness_distance_list[:7])

    # Create a list of tuples with sum and corresponding combination of meals
    sum_combinations = list(zip(appropriateness_distance, res))
    #print(sum_combinations[:7])

    # Sort the list of tuples based on the sums
    sorted_sum_combinations = sorted(sum_combinations, key=lambda x: x[0])
    #print(sorted_sum_combinations[:7])

    # Extract the sorted combinations of meals
    sorted_res = [combination for (sum, combination) in sorted_sum_combinations]
    #print(len(sorted_res))
    #print(sorted_res[:7])

    step2_end = time.time()
    step2_elapsed_time = step2_end-step2_start

    step3_start = time.time()
    # Top 7 NPs after 2 diversity filters
    final_meals = NPs_diversity(sorted_res)
    step3_end = time.time()
    step3_elapsed_time = step3_end-step3_start


    elapsed_time = step3_end-step1_start
    print("elapsed_time:", elapsed_time)
    print("elapsed1_time:", step1_elapsed_time)
    print("elapsed2_time:", step2_elapsed_time)
    print("elapsed3_time:", step3_elapsed_time)


    n = 0
    n1 = 0
    n2 = 0
    n3 = 0
    for s in sum_kcal:
        if s > 3000:
            n += 1 
        if s>=2500 and s<3000:
            n1 += 1
        if s>=2000 and s<2500:
            n2 += 1
        if s<2000:
            n3 += 1    

    print(n)
    print(n1)
    print(n2)
    print(n3)
    

    #-------------------------------------#
    #|                                   |#
    #|                                   |#
    #| Check how good is the final meals |#
    #|                                   |#
    #|                                   |#
    #-------------------------------------#

    
    f_sum_kcal,f_sum_fat,f_sum_frandveg,f_dishes_div = sum_NPs_characteristics(final_meals, meal_info_dict)
    print("########################")
    print("########################")
    print("energy intake:", energy_intake)
    print(f_sum_kcal)
    print(f_sum_fat)
    print(f_sum_frandveg)
    print(f_dishes_div)
 
    f_appropriateness_distance=score_NPs(energy_intake, final_meals, f_sum_kcal, f_sum_fat, f_sum_frandveg, f_dishes_div)
    print("final meals appropriateness distance")
    print(f_appropriateness_distance)


    #-------------------------------------#
    #|                                   |#
    #|                                   |#
    #|    Save statistics to excel       |#
    #|                                   |#
    #|                                   |#
    #-------------------------------------#

    
    import pandas as pd

    # create a dictionary with the results
    data = {
        'Energy Intake': [energy_intake],
        'Sum Kcal': [f_sum_kcal[0]],
        'Sum Fat': [f_sum_fat[0]],
        'Sum Fruits and Vegetables': [f_sum_frandveg[0]],
        'Dishes Diversity': [f_dishes_div[0]],
        'Appropriateness Distance': [f_appropriateness_distance[0]]
    }

    # Create a Pandas dataframe from the dictionary
    df = pd.DataFrame(data)

    # Save the dataframe to an Excel file
    df.to_excel('C:/Users/kyrikalp/Desktop/S2Hcodes/zxcvxzvv/meal_appropriateness.xlsx', index=False)
    

    # Serialize data in order to show them in the frontend
    serialized_res = []
    for item in  final_meals:
        serialized_item = [] 
        for meal in item:
            serializer = MealSerializer(meal)
            serialized_meal = serializer.data
            serialized_item.append(serialized_meal)
        serialized_res.append(serialized_item)

    return Response(serialized_res)


def get_meal_info_dict(meals):
    
    meal_info_dict = {}
    for m in meals:
        kcal = 0 
        fat = 0
        fruit = 0
        raw_vegetables = 0
        cooked_vegetables = 0
        dish_list = [m.dish_1, m.dish_2, m.dish_3, m.dish_4, m.dish_5, m.dish_6, m.dish_7, m.dish_8, m.dish_9, m.dish_10]
        for dish in dish_list:
            if dish is not None:
                kcal += dish.kcal
                fat += dish.fat
                if dish.fruit:
                    fruit += 1
                if dish.raw_vegetables:
                    raw_vegetables += 1
                if dish.cooked_vegetables:
                    cooked_vegetables += 1
        meal_info_dict[m.id] = {'kcal': kcal, 'fat': fat, 'fruit': fruit, 'raw_vegetables': raw_vegetables, 'cooked_vegetables': cooked_vegetables}
    return meal_info_dict

def sum_NPs_characteristics(res, meal_info_dict):
    
    sum_kcal = []
    sum_fat = []
    sum_frandveg = []
    dishes_div = []
    # sum kcal,fat and (fruit and vegetables) for each NP
    for i in range(len(res)):
        kcal = 0
        fat = 0
        fruit = 0
        raw_vegetables = 0
        cooked_vegetables = 0
        frandveg = 0
        dishes_list = []
        # iterate through each one of the five meals for a specific NP
        for j in range(0,5):

                meal_info = meal_info_dict.get(res[i][j].id)
                kcal += meal_info['kcal']
                fat += meal_info['fat'] * 9
                fruit += meal_info['fruit']
                raw_vegetables += meal_info['raw_vegetables']
                cooked_vegetables += meal_info['cooked_vegetables']
            
                if res[i][j].dish_1 is not None:
                    dishes_list.append(res[i][j].dish_1)
                if res[i][j].dish_2 is not None:
                    dishes_list.append(res[i][j].dish_2)
                if res[i][j].dish_3 is not None:
                    dishes_list.append(res[i][j].dish_3)
                if res[i][j].dish_4 is not None:
                    dishes_list.append(res[i][j].dish_4)
                if res[i][j].dish_5 is not None:
                    dishes_list.append(res[i][j].dish_5)
            
            
        frandveg = fruit + raw_vegetables + cooked_vegetables
        sum_kcal.append(kcal)
        sum_fat.append(fat)
        sum_frandveg.append(frandveg)
        # check if all dishes in each one of the NPs are unique
        result = len(set(dishes_list)) == len(dishes_list)
        dishes_div.append(result)
    return sum_kcal,sum_fat,sum_frandveg,dishes_div

def score_NPs(energy_intake, res, sum_kcal, sum_fat, sum_frandveg, dishes_div):
    
    AWARD_VALUE_ESSENTIAL = 0.001
    AWARD_VALUE = 0.1
    PENALTY_VALUE = 100.0
    CALORIC_LIMIT_MIN = 200.0
    CALORIC_LIMIT_MAX = 500.0
    CALORIC_PENALTY_MIN = 100.0
    CALORIC_PENALTY_MAX = 1000000.0
    NAP_EXCLUSION_VALUE = 10000000.0
    fat_t1 = energy_intake*0.25
    fat_t2 = energy_intake*0.35

    caloric_distance = [0] * len(res)
    fat_distance = [0] * len(res)
    frandveg_distance = [0] * len(res)
    dishes_distance = [0] * len(res)
    for i in range(len(res)):

        # how good is that NP regarding calories
        caloric_distance[i] = abs(sum_kcal[i] - energy_intake)
        if (caloric_distance[i] == 0.0):
            caloric_distance[i] = AWARD_VALUE_ESSENTIAL
        else:
            if caloric_distance[i] > CALORIC_LIMIT_MIN:
                if caloric_distance[i] > CALORIC_LIMIT_MAX:
                    caloric_distance[i] *= CALORIC_PENALTY_MAX
                else:
                    caloric_distance[i] *= CALORIC_PENALTY_MIN
        
        # how good is the NP regarding fats
        fat_distance[i]=1.0
        if sum_fat[i] >= fat_t1 and sum_fat[i] <= fat_t2:
            fat_distance[i] = AWARD_VALUE
        else:
            fat_distance[i] = PENALTY_VALUE

        # fow good is the NP regarding fruits and vegetables
        if sum_frandveg[i] < 5 or sum_frandveg[i] > 10:
            frandveg_distance[i] = PENALTY_VALUE
        else:
            frandveg_distance[i] = AWARD_VALUE
        
        
        # how good is the NP regarding dishes diversity
        if dishes_div[i] == True:
            dishes_distance[i] = AWARD_VALUE
        else:
            dishes_distance[i] = NAP_EXCLUSION_VALUE
        
    #print("energy intake of the user: " + str(energy_intake))
    #print("caloric distance")
    #print(caloric_distance[:7])
    #print("fat distance")
    #print(fat_distance[:7])
    #print("fruits and vegetables distance")
    #print(frandveg_distance[:7])
    #print("dishes distance")
    #print(dishes_distance[:7])
    #print("#######")

    appropriateness_distance = [1] * len(res)
    for i in range(len(res)):
        appropriateness_distance[i] *= caloric_distance[i]
        appropriateness_distance[i] *= fat_distance[i]
        appropriateness_distance[i] *= frandveg_distance[i]
        appropriateness_distance[i] *= dishes_distance[i]
        
    #print("appropriateness distance")
    #print(appropriateness_distance[:7])
    return appropriateness_distance

def NPs_diversity(sorted_res):
    # Diversity step 1!!!
    meals_id = []
    meals_id.append(sorted_res[0][0].id)
    meals_id.append(sorted_res[0][1].id)
    meals_id.append(sorted_res[0][2].id)
    meals_id.append(sorted_res[0][3].id)
    meals_id.append(sorted_res[0][4].id)
    unique_meals = []
    unique_meals.append(sorted_res[0])
    for i in range(1,len(sorted_res)):
        cnt = 0
        for j in range(5):
            x = meals_id.count(sorted_res[i][j].id)
            if (sorted_res[i][j].id not in meals_id) or (x<3):
                cnt += 1
        if cnt == 5:
            meals_id.append(sorted_res[i][0].id)
            meals_id.append(sorted_res[i][1].id)
            meals_id.append(sorted_res[i][2].id)
            meals_id.append(sorted_res[i][3].id)
            meals_id.append(sorted_res[i][4].id)
            unique_meals.append(sorted_res[i])
            
    
    #print("######################")
    #print("######################")
    #print(meals_id)
    #print(meals_id.count(66))
    #print(cnt_meals)
    #print(unique_meals)


    # Diversity step 2!!!
    list1 = []
    list1.append(meals_id[:5])
    final_meals = []
    final_meals.append(unique_meals[0])

    for j in range(5, len(meals_id), 5):
        #print("#########################################")
        list2 = meals_id[j:j+5]
        set2 = set(list2)
        cnt = 0
        for i in range(0, len(list1)):
            set1 = set(list1[i])
            #print(list1)
            #print(list2)
            similarity = len(set1.intersection(set2)) / len(set1.union(set2))
            #print(similarity)
            if similarity < 0.4:
                cnt += 1
        if cnt == len(list1):
            list1.append(list2)
            final_meals.append(unique_meals[int(j/5)])
            if len(final_meals) == 7:
                break; 
    #print("###########################")
    #print(list1)
    #print("########################")
    #print("########################")
    #print(final_meals)
    return final_meals