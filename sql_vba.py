import mysql.connector
import csv

# MySQLに接続
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="ckyu676D0620!",
    database="dairy_data"
)
cursor = conn.cursor()

# クエリを実行
cursor.execute("SELECT * FROM 工事データ")

# データをCSVファイルに書き込み
with open('data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow([i[0] for i in cursor.description])  # ヘッダー行を書き込み
    writer.writerows(cursor.fetchall())  # データを書き込み

cursor.close()
conn.close()

# 全データを取得
if __name__ == "__main__":
    get_all_data()
