import numpy as py
import pandas as pd
import matplotlib.pyplot as plt

d = {
    'In Situ': 0,
    'Localized': 0,
    'Regional': 0,
    'Distant': 0,
    'Unstaged': 0
}
num_csvs = 24

def readData():
    # df = pd.read_csv('data/USCSSurvivalByStage (2).csv')

    # for i in range(3, 26):
    #     file_name = f'data/USCSSurvivalByStage ({i}).csv'
    #     new_df = pd.read_csv(file_name)
    #     df = pd.merge(df, new_df, on='Measure').fillna(0)
    
    # print(df)

    for i in range(2, 26):
        file_name = f'data/USCSSurvivalByStage ({i}).csv'

        row = pd.read_csv(file_name)

        measures = row['Measure'].astype(str)
        percents = row['Percent (%)'].astype(float)
        # print(measures)
        # print(percents)
        # return

        for j in range(len(measures)):
            measure = measures[j]
            percent = percents[j]

            if measure not in d:
                print(measure)
            else:
                d[measure] += percent
    
    # print(d)

    for key in d.keys():
        if key == "Distant":
            d[key] /= (num_csvs - 1)
        elif key == "Regional" or key == "Unstaged":
            d[key] /= (num_csvs - 2)
        else:
            d[key] /= num_csvs
    
    print(d)

readData()