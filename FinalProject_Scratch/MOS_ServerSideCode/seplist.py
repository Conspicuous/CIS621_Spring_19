import re
import sqlite3
import pprint as pp
from array import *
import sys

def main():
    d = {}
    row = []
    db_name = "MOS_IndexTable.db"
    with open('MOS_Sites_Cleaned.txt',
              'r') as infile:  # using with open will close the file after process completes w/o having to type out close()
        with open('SiteListMOS.txt', 'w+') as outfileA, open('Locs_Names_MOS.txt', 'w+') as outfileB:
            # GET THE STATION IDENT
            for i, line in enumerate(infile.readlines()):
                try:
                    StnIdent=re.findall(r'\((.+?)\)', line)[-1]
                    StnName=re.findall(r'.+?(?=\()', line)[0]
                    # if not line: # If the line isn't empty (e.g. blank)
                    outfileA.write("\"" + StnIdent + "\"" + "\n")  # write to fileA the stn identifer (-1 is last ind)
                    outfileB.write("\"" + StnName + "\"" + "\n")  # write to fileB the name of the station.
                    d[StnIdent] = StnName
                    row+={(StnIdent,StnName)}

                except:

                    continue


            sql_create_MOS_table= """ CREATE TABLE MOS_Sites(
            stnident TEXT PRIMARY KEY, 
            stnname TEXT )"""
            conn = create_connection(db_name) # create database connection
            conn.execute("DROP TABLE MOS_Sites")
            create_table(conn, sql_create_MOS_table)
            conn.commit()
            # print(row[0][:])
            for i, row in enumerate(row):
                # print(row)
                create_mos_row(conn,row)
            conn.commit()
            check_data(conn)

            return row


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Exception as e:
        print(e)

    return None


def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Exception as e:
        print(e)

def create_mos_row(conn,MOS_row):
    """
     Create a new task
     :param conn: db connection
     :param row: data for one site
     :return:
     """
    print(MOS_row)
    sql_command = """INSERT INTO MOS_Sites(stnident, stnname) VALUES (?,?)"""
    crsr=conn.cursor()
    crsr.execute(sql_command,MOS_row)


def check_data(conn):



    with conn:

        try:
            crsr=conn.cursor()
            crsr.execute("SELECT * FROM MOS_Sites")
            print(crsr.fetchall())
        except sqlite3.Error as e:
            print()
#
#
# def insert_data_to_table(table_name,table_rows,data):
#
#     # Error check later
#     try:
#         conn = sqlite3.connect(table_name)
#         crsr = conn.cursor()
#
#         # crsr.executemany("INSERT INTO MOS_Sites (stnident, stnname) VALUES (?,?)", row)
#         crsr.executemany("INSERT INTO MOS_Sites (stnident, stnname) VALUES (?,?)", data)
#
#         conn.commit()
#
#         conn.close()
#     except sqlite3.OperationalError as e: # if the table doesn't exist
#         create_table(table_name)
#         insert_data_to_table(table_name,table_rows,data) #re-call the function
#     except sqlite3.IntegrityError as e:
#         return
#
#
#
# def bad_programming_practices():
#     return



if __name__ == "__main__":
    Data = main()

   # # Exists= check_table_exists("MOS_IndexTable.db",'MOS_Sites')
   #  print(Exists)
   #
   #
   #
   #  insert_data_to_table("MOS_IndexTable.db",["stnident","stnname"],Data)
   #  # check_table_exists("MOS_IndexTable.db","MOS_Sites")
   #  # databaseconnector(Data)
   #  check_data("MOS_Sites")



    ##TODO: Beautiful Soup MOS, Integrate w/jquery