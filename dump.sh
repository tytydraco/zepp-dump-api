#!/usr/bin/env bash

cd "$1" || exit 1

rm -f out.txt
pkill -9 node
(
    echo "uninstall"
    sleep 3
    echo "connect"
    sleep 5
    echo "install"
) | zeus bridge > out.txt &

while true; do
    ! grep -q "|---DONE---|" out.txt && sleep 5 && continue
    break
done

while IFS= read -r line; do
    if [[ "$line" == *"|---DONE---|"* ]]; then
        pkill -9 node
        rm out.txt
        exit 0
    fi

    if [[ "$line" == *"|"* ]]; then
       echo "$line" | awk -F'|' '{ print $2 }' | sed 's/.$//; s/^.//' | awk -F'"' '{ print $2 }' >> api.js
    fi
done < out.txt