#!/bin/sh
TABLE_NAME=$(terraform output table_name)
echo $TABLE_NAME
sed -i "s/STUDENT_TABLE =/STUDENT_TABLE = $TABLE_NAME/g" ".env" #set a value
sed -i "s/STUDENT_TABLE = $TABLE_NAME/STUDENT_TABLE =/g" ".env" #unset a value
