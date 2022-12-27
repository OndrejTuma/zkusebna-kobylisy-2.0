#!/bin/bash

username="root"
hostname="46.101.197.134"
zk_dir="zkusebna-kobylisy-2.0"

# export the database and save output filename to a variable
exportFileName=$(ssh $username@$hostname bash $zk_dir/backup/export-db.sh | tail -n 1)

# download the exported database
scp $username@$hostname:./$exportFileName ./

# remove the exported database from the server
ssh $username@$hostname rm $exportFileName