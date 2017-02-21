import mysql.connector
cnx = mysql.connector.connect(user='root', database='quizdata')
cursor = cnx.cursor()
cursor.execute("Drop table if exists Medal;");
cursor.execute("Drop table if exists Athlete;");
cursor.execute("Drop table if exists Event;");
cursor.execute("Drop table if exists Sport;");
cursor.execute("Drop table if exists Country;");
cnx.commit()
cursor.close()
cnx.close()

