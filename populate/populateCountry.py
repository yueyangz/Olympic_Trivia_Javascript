'''
John F. Lake, Jr. 
Script to Populate Database
'''


import mysql.connector

cnx = mysql.connector.connect(user='root', database='quizdata')
cursor = cnx.cursor()


add_country = ("INSERT INTO Country "
               "(name, GDP, Population)"
               "VALUES (%s, %s, %s)")

countryInfo = {}

with open('country.csv') as f:
    for line in f: 
        words = line.rstrip().split(',');
        country = {}
        country['GDP'] = words[4]
        country['POP'] = words[5]
        countryInfo[words[3]] = country

for country in countryInfo: 
    info = countryInfo[country]
    data_country = (country,info['GDP'],info['POP'])
    cursor.execute(add_country,data_country)

cnx.commit()
cursor.close()
cnx.close()



