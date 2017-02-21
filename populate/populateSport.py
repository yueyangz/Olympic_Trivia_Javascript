'''
John F. Lake, Jr. 
Script to Populate Database
'''


import mysql.connector

cnx = mysql.connector.connect(user='root', database='quizdata')
cursor = cnx.cursor()


add_sport = ("INSERT INTO Sport(idSport,name)"
             "VALUES(%s,%s)")

sports = {}
with open('oly.csv') as f:
    for line in f: 
        words = line.rstrip().split(',');
        sports[words[3]] = 'add'


for s in sports:
        data_sport = ('NULL',s)
        cursor.execute(add_sport,data_sport)

cnx.commit()
cursor.close()
cnx.close()



