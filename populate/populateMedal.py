'''
John F. Lake, Jr. 
Script to Populate Database
'''
import mysql.connector
cnx = mysql.connector.connect(user='root', database='quizdata')
cursor = cnx.cursor(buffered=True)

add_medal = ("INSERT INTO Medal(idMedal,country,idAthlete,type,idEvent,year)"
             "VALUES(%s,%s,%s,%s,%s,%s);")

med = {}

medn = 0
with open('olytab.tsv') as f:
    for line in f: 
        med_info = {}
        words = line.rstrip().split('\t');
        names = words[4].split(',');
        med_info['country'] = words[5]
        med_info['type'] = words[9]
        med_info['year'] = words[1]
        med_info['sport'] = words[3]
        med_info['event'] = words[7]
        names = words[4].split(',');
        if len(names) == 2: 
            med_info['first'] = names[1]
            med_info['last'] = names[0]
        else: 
            med_info['last'] = names[0]
            med_info['first'] = ""
        med[medn] = med_info
        medn = medn+1

for key in med:
        print med[key]
        sp =med[key]['sport']
        cursor.execute("""SELECT idSport from Sport where name=%s""",(sp,));
        row = cursor.fetchone();
        idSport = row[0]
        print "IDSPORT: ",idSport
        cursor.execute("""SELECT idEvent from Event where idSport=%s AND name=%s""",(idSport,med[key]['event']));
        row = cursor.fetchone();
        if row is not None:
            idEvent = row[0]
            print "IDEVENT: ",idEvent
            cursor.execute("""SELECT idAthlete from Athlete where last_name=%s AND id_primary_sport=%s AND country=%s""",(med[key]['last'],idSport,med[key]['country']))
            row = cursor.fetchone();
            if row is not None:
                idAthlete = row[0]
                print "IDATHLETE: ",idAthlete
                data_med = ('NULL',med[key]['country'],idAthlete,med[key]['type'],idEvent,med[key]['year'])
                print data_med
                cursor.execute(add_medal,data_med)

cnx.commit()
cursor.close()
cnx.close()



