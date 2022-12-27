#!/bin/bash

# usage: bash backup/import-db.sh <tarballFileName> <exportDir>

tarballFileName=$1

targetContainer="zkusebna-kobylisy-mongo"
targetDb="zk"
[ -z "$2" ] && exportDir="db-backup" || exportDir=$2

# copy tarball to container
docker cp $tarballFileName $targetContainer:.

# unzip tarball
tar -xf $tarballFileName
# and in container
docker exec $targetContainer tar -xf $(basename $tarballFileName)

# import each of the file
for backupfile in "$exportDir"/*
do
  filename="$(basename $backupfile)"
  docker exec $targetContainer mongoimport --collection="${filename%.*}" --db=$targetDb --file=$backupfile
done

# remove backups
rm -rf $exportDir
docker exec $targetContainer rm -rf $exportDir $(basename $tarballFileName)
