#!/bin/bash

tarballFileName=$1

targetContainer="zkusebna-kobylisy-mongo"
targetDb="zk"
[ -z "$2" ] && exportDir="db-backup" || exportDir=$2

# unzip tarball
tar -xf $tarballFileName

# import each of the file
for backupfile in "$exportDir"/*
do
  filename="$(basename backupfile)"
  docker exec $targetContainer mongoimport --collection="${filename%.*}" --db=$targetDb --file=$backupfile
done

# remove backups
rm -rf $exportDir