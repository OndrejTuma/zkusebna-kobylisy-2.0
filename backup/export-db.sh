#!/bin/bash

targetContainer="zkusebna-kobylisy-mongo"
targetDb="zk"
collections=( categories items reservationtypes )
exportFileName="backup_$(date +"%Y_%m_%d").tar.gz"
exportDir="db-backup"

# loop over defined collections and export them all to one directory
for col in "${collections[@]}"
do
   :
   docker exec $targetContainer mongoexport --collection=$col --db=$targetDb --out=$exportDir/$col.json
done

# tarball exported directory
docker exec $targetContainer tar -czvf $exportFileName $exportDir

# copy tarball to local fs
docker cp $targetContainer:$exportFileName ./

# cleanup in container
docker exec $targetContainer rm -rf $exportDir $exportFileName