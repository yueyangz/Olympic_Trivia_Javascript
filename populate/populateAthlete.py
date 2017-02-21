'''
John F. Lake, Jr. 
Script to Populate Database
'''
import mysql.connector
cnx = mysql.connector.connect(user='root', database='quizdata')
cursor = cnx.cursor()

add_athlete = ("INSERT INTO Athlete(idAthlete,country,first_name,last_name,id_primary_sport)"
             "VALUES(%s,%s,%s,%s,%s);")

ath = {}

with open('olytab.tsv') as f:
    for line in f: 
        ath_info = {}
        words = line.rstrip().split('\t');
        print words
        names = words[4].split(',');
        ath_info['country'] = words[5]
        if len(names) == 2: 
            ath_info['first'] = names[1]
            ath_info['last'] = names[0]
        else: 
            ath_info['last'] = names[0]
            ath_info['first'] = ""
        ath_info['SPO'] = words[3]
        ath["".join(names)] = ath_info

for key in ath:
        sp =ath[key]['SPO']
        cursor.execute("""SELECT idSport from Sport where name=%s""",(sp,));
        row = cursor.fetchone();
        idSport = row[0]
        print ath[key]
        data_ath = ('NULL',ath[key]['country'],ath[key]['first'],ath[key]['last'],idSport)
        cursor.execute(add_athlete,data_ath)

cnx.commit()
cursor.close()
cnx.close()



