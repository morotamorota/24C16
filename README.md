# Dairy Report Generator

このプロジェクトは、Excel VBAを使用して、指定された期間に基づいて日報データを生成するアプリケーションです。ユーザーは会社名、社員名、および期間（開始月と終了月）を入力することで、対応するデータをデータベースから取得し、Excelシートに出力します。

## 機能

- **会社名と社員名の選択**: ドロップダウンリストで会社名と社員名を選択できます。
- **日付範囲の入力**: 開始月と終了月を指定して、期間内のデータを取得します。
- **日報データの生成**: 選択された情報に基づいて日報データを取得し、Excelに出力します。

## 使用方法

### ユーザーインターフェース
- **CompanyComboBox**: 会社名を選択するコンボボックス。
- **EmployeeComboBox**: 選択した会社に基づいて社員名を表示するコンボボックス。
- **TextBox1**: 開始月を入力するテキストボックス（例: `2023/07`）。
- **TextBox2**: 終了月を入力するテキストボックス（例: `2023/09`）。
- **CommandButton1**: データを取得してレポートを生成するボタン。
- **CommandButton2**: 入力値をリセットするキャンセルボタン。

### 処理の流れ
1. **UserForm_Initialize**: アプリケーションが初期化されるとき、ODBC接続を使用してデータベースから会社名のリストを取得し、`CompanyComboBox`に表示します。
2. **CompanyComboBox_Change**: 会社名が選択されると、対応する社員名をデータベースから取得し、`EmployeeComboBox`に表示します。
3. **CommandButton1_Click**: ユーザーが入力した開始月、終了月、会社名、社員名に基づいて、データベースから対応する日報データを取得し、Excelシートに出力します。出力結果は、ID、日付、工事名、枝番、区分、会社名、作業者名、定時、時間外、開始時刻、終了時刻を含みます。
4. **CommandButton2_Click**: 入力内容をリセットします。

## データベース接続

### ODBC接続の設定と使用方法

ODBC（Open Database Connectivity）は、異なるデータベース管理システム（DBMS）とアプリケーションを接続するための標準インターフェースです。Excelから直接データベースにアクセスし、SQLクエリを実行することができます。

### 1. ODBCとは

ODBCを使用すると、Excelなどのアプリケーションから異なるデータベース管理システムにアクセスできます。例えば、MySQLやSQL Serverなど、ODBCドライバを介してデータベースに接続し、SQLクエリを実行できます。

### 2. ODBCドライバのインストール

まず、接続先のデータベースに対応したODBCドライバをインストールする必要があります。例えば、MySQLの場合、以下の手順でドライバをインストールします。

- **MySQLの場合**: [MySQL ODBCドライバ](https://dev.mysql.com/downloads/connector/odbc/)をダウンロードしてインストールします。
- **SQL Serverの場合**: [Microsoft ODBCドライバ](https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server)をダウンロードしてインストールします。

### 3. ODBC接続の設定

ODBC接続を使用するには、まず「ODBCデータソースアドミニストレーター」で接続設定を行います。

#### 手順:

1. **Windowsの場合**:
   - 「スタートメニュー」→「ODBCデータソースアドミニストレーター」を検索して開きます。
   - 「システムDSN」または「ユーザーDSN」のタブを選択します。
   - 「追加」をクリックし、使用するデータベースドライバ（MySQL、SQL Serverなど）を選択します。
   - 必要な接続情報（ホスト名、データベース名、ユーザー名、パスワードなど）を入力して「OK」をクリックして設定を保存します。

2. **MacやLinuxの場合**:
   - `odbc.ini`や`odbcinst.ini`ファイルを設定してODBC接続を構成します。
   - 必要なドライバをインストールし、接続設定を行います。

### 4. Excel VBAでのODBC接続

Excel VBAからODBCを利用してデータベースに接続するには、`ADODB`ライブラリを使って接続します。以下に、具体的なVBAコードの例を示します。

#### VBAコード例:

```vba
Sub ConnectToDatabase()
    ' データベース接続に必要なオブジェクトの宣言
    Dim conn As Object
    Dim rs As Object
    Dim sqlQuery As String
    Dim connString As String
    
    ' 接続文字列 (DSN、ユーザー名、パスワードを指定)
    connString = "Driver={MySQL ODBC 8.0 ANSI Driver};" & _
                 "Server=your_server_address;" & _
                 "Database=your_database_name;" & _
                 "User=your_user_name;" & _
                 "Password=your_password;"
    
    ' 接続オブジェクトを作成
    Set conn = CreateObject("ADODB.Connection")
    conn.Open connString
    
    ' SQLクエリの設定
    sqlQuery = "SELECT * FROM your_table_name"
    
    ' レコードセットを開く
    Set rs = conn.Execute(sqlQuery)
    
    ' 取得したデータをシートに出力
    Dim i As Integer
    i = 1
    Do Until rs.EOF
        Cells(i, 1).Value = rs.Fields(0).Value ' 1列目
        Cells(i, 2).Value = rs.Fields(1).Value ' 2列目
        ' ... 必要に応じて他の列も処理
        rs.MoveNext
        i = i + 1
    Loop
    
    ' レコードセットと接続のクローズ
    rs.Close
    conn.Close
End Sub


## 廣安パート

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

