#!/usr/bin/env bash

export CUSTOMPLAIN_SKIPGLOBALLOGINFLAG=${CUSTOMPLAIN_SKIPGLOBALLOGINFLAG:-false}
export CUSTOMPLAIN_PRDMODEFLAG=${CUSTOMPLAIN_PRDMODEFLAG:-true}

while IFS='=' read -r name value ; do
    if [[ $name == 'CUSTOMPLAIN_'* ]]; then
        sed -i "s#'<$name>'#${!name}#g" src/environments/environment.custom.ts
        echo "replacing <$name> to ${!name}"
    fi
done < <(env)
while IFS='=' read -r name value ; do
    if [[ $name == 'CUSTOM_'* ]]; then
        sed -i "s#<$name>#${!name}#g" src/environments/environment.custom.ts
        sed -i "s#<$name>#${!name}#g" angular.json
        echo "replacing <$name> to ${!name}"
    fi
done < <(env)