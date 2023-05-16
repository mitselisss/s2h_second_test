import pandas as pd
from django.core.exceptions import ObjectDoesNotExist
from api.models import Dish

def run():
    #df = pd.read_csv("Meals.csv")
    df = pd.read_csv('C:/Users/emmadimi/Desktop/S2H Codes/S2H_integration_v01 - Copy (2)/backend/scripts/Dishes(Spain).csv')

    for index, row in df.iterrows():
        #print(index, row)
        dish_id = row['ID']

        try:
            dish = Dish.objects.get(id=dish_id)
        except ObjectDoesNotExist:
            flag = True
            dish = Dish(id=dish_id)
            
            dish.id = row['ID']
            dish.name_m = row['Name (in Spanish)']
            dish.name_en = row['Name (in English)']
            dish.ingredients_child_1_m = row['Ingredients of a standard portion for a 3-6 year-old child (in Spanish)']
            dish.ingredients_child_1_en = row['Ingredients of a standard portion for a 3-6 year-old child (in English)']
            dish.ingredients_child_2_m = row['Ingredients of a standard portion for a 7-12 year-old child (in Spanish)']
            dish.ingredients_child_2_en = row['Ingredients of a standard portion for a 7-12 year-old child (in English)']
            dish.ingredients_child_3_m = row['Ingredients of a standard portion for a 13-15 year-old child (in Spanish)']
            dish.ingredients_child_3_en = row['Ingredients of a standard portion for a 13-15 year-old child (in English)']
            dish.ingredients_child_4_m = row['Ingredients of a standard portion for a 16-18 year-old child (in Spanish)']
            dish.ingredients_child_4_en = row['Ingredients of a standard portion for a 16-18 year-old child (in English)']
            dish.ingredients_adult_m = row['Ingredients of a standard portion for an adult (in Spanish)']
            dish.ingredients_adult_en = row['Ingredients of a standard portion for an adult (in English)']
            dish.recipe_m = row['Recipe (in Spanish)']
            dish.recipe_en = row['Recipe (in English)']
            dish.tip_m = row['Tip (in Spanish)']
            dish.tip_en = row['Tip (in English)']

            if pd.isna(row['Kcal']) is False:
                dish.kcal = row['Kcal']
            else:
                flag = False
            if pd.isna(row['Protein']) is False:
                dish.protein = row['Protein']
            else:
                flag = False
            if pd.isna(row['Fat']) is False:
                dish.fat = row['Fat']
            else:
                flag = False
            if pd.isna(row['Carbohydrates']) is False:
                dish.carbohydrates = row['Carbohydrates']
            else:
                flag = False

            dish.type = row['Dish type']
            dish.autumn = row['For Autumn']
            dish.winter = row['For Winter']
            dish.spring= row['For Spring']
            dish.summer = row['For Summer']
            dish.white_meat = row['White meat']
            dish.red_meat = row['Red meat']
            dish.pork = row['Pork']
            dish.fish = row['Fish or seafood']
            dish.pulses = row['Pulses (Legumes)']
            dish.diary = row['Dairy']
            dish.eggs = row['Eggs']
            dish.pasta = row['Pasta']
            dish.rice = row['Rice']
            dish.tubers = row['Tubers']
            dish.soups = row['Soups']
            dish.cereals = row['Cereals']
            dish.fruit = row['Fruit']
            dish.nuts = row['Nuts']
            dish.raw_vegetables = row['Raw vegetables']
            dish.cooked_vegetables = row['Cooked vegetables']
            dish.protein_mix = row["Protein mix"]
            dish.unique = row["Unique"]
            dish.semi_unique = row["Semiunique"]
            dish.vegetables_semi = row["Vegetables for semi"]
            dish.red = row["Red"]
            dish.green = row["Green"]
            dish.white = row["White"]
            dish.yellow = row["Yellow"]
            dish.purple = row["Purple"]
            dish.multicolor = row["Multicolor"]
            dish.no_color = row["No color"]
            dish.for_proposals = row["For proposals"]
            dish.for_school = row["For school"] 

            if flag:  
                dish.save()