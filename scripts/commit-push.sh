###
 # @Author: Rainy
 # @Date: 2020-05-24 13:05:40
 # @LastEditors: Rainy
 # @LastEditTime: 2020-05-24 13:06:02
### 

#!/usr/bin/env bash

echo "------------ commit push shell run ------------"

read -p "Input your commit msg (*): " msg
read -p "Amend commit(Y, y, default: N): " amend
read -p "Need pull current branch(Y, y, default: N): " pull

len=120
curBranch=$(git branch | awk '/\*/ { print $2; }')

# start reg
msgRegLower='^\s*(feat|fix|docs|style|chore|build|ci|perf|refactor|revert|test|temp|update)\s*\:*\s*'
msgRegUpper='^\s*(Feat|Fix|Docs|Style|Chore|Build|Ci|Perf|Refactor|Revert|Test|Temp|Update)\s*\:*\s*'

# 另一种获取当前 branch_name 的方法
# git symbolic-ref --short HEAD

echo "Log: Cureren branch is ${curBranch}"

if [[ $pull = "Y" || $pull = "y" ]];then

    read -p "Need pull branch(default: current branch, eg: master): " branch

fi

if [ -n "$msg" ];then

    echo "Log: Commit msg: $msg"

    if [ ${#msg} -gt $len ];then
        echo "Error: msg length must less than $len"
        exit 1
    fi

    if [[ "$msg" =~ $msgRegLower || "$msg" =~ $msgRegUpper ]];then

        git add .
        
        if [[ $amend = "Y" || $amend = "y" ]];then
            echo "Log: Amending message commit"
            git commit --amend -m "$msg" || exit 1
        else
            echo "Log: Commiting"
            git commit -m "$msg" || exit 1
        fi

        if [[ $pull = "Y" || $pull = "y" ]];then

            if [ -n "$branch" ];then

            echo "Log: Pulling branch is $branch"

            fi

            branch=${curBranch}

            echo "Log: Pulling ${branch} from remote"
            git pull origin ${branch} || exit 1

        else

            branch=${curBranch}

            echo "Log: Current branch is $branch"

            echo "Log: Jump pull branch"

        fi

        read -p "Auto Push(Y, y, default: Y): " push

        if [ -z "${push}" ];then
            push='Y'
        fi

        if [[ $push = "Y" || $push = "y" ]];then

            echo "Log: Pushing"

            git push origin ${branch} || exit 1
        fi

        echo "------------ commit push shell end ------------"

    else
        echo "Error: Commit message start type must be one of [feat, fix, docs, style, chore, build, ci, perf, refactor, revert, test, temp, Feat, Fix, Docs, Style, Chore, Build, Ci, Perf, Refactor, Revert, Test, Temp]"
        exit 1
    fi

else

    echo "Please input commit msg"
    exit 1

fi
