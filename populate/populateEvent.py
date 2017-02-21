'''
John F. Lake, Jr. 
Script to Populate Database
'''
import mysql.connector
cnx = mysql.connector.connect(user='root', database='quizdata')
cursor = cnx.cursor()

add_event = ("INSERT INTO Event(idEvent,name,gender,idSport)"
             "VALUES(%s,%s,%s,%s)")
#sel_sport = ("""SELECT idSport from Sport where name ='%s'""")

events = {}
with open('olytab.tsv') as f:
    for line in f: 
        event_info = {}
        words = line.rstrip().split('\t');
        event_info['GEN'] = words[8]
        event_info['SPORT'] = words[3]
        events[words[7]] = event_info

for key in events:
        sp =events[key]['SPORT']
        cursor.execute("""SELECT idSport from Sport where name=%s""",(sp,));
        row = cursor.fetchone();
        idSport = row[0]
        data_event = ('NULL',key,events[key]['GEN'],idSport)
        cursor.execute(add_event,data_event)

cnx.commit()
cursor.close()
cnx.close()



