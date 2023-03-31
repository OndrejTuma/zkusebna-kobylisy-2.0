#!/bin/bash

username="root"
hostname="46.101.197.134"
zk_dir="zkusebna-kobylisy-2.0"
targetContainer="zkusebna-kobylisy-mongo"
col="tokens"
targetDb="zk"
exportFileName="$col.json"

ssh $username@$hostname docker exec $targetContainer mongoexport --collection=$col --db=$targetDb --out=$exportFileName
ssh $username@$hostname docker cp $targetContainer:$exportFileName ./
ssh $username@$hostname docker exec $targetContainer rm $exportFileName

scp $username@$hostname:./$exportFileName ./
ssh $username@$hostname rm $exportFileName

docker exec $targetContainer mongosh $targetDb --eval "db.$col.remove({})"
docker cp $exportFileName $targetContainer:.
docker exec $targetContainer mongoimport --collection=$col --db=$targetDb --file=$exportFileName
docker exec $targetContainer rm $exportFileName
rm $exportFileName
