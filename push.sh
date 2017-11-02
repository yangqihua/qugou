#!/usr/bin/env bash

echo '切换到 master 分支'
git checkout master

ehco 'git add 全部'
git add .

echo 'git commit 全部'
git commit -am "$1"

echo '推送到 master 分支'
git push origin master
