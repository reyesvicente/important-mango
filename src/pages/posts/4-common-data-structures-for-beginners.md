---
title: 4 Common Data Structures For Beginners
date: 2019-07-29T00:06:21.160Z
thumb_img_path: /images/unsubscribed.png
excerpt: 1.) Arrays - A collection of elements identified by an index or a key
template: post
---
*Originally posted on my [blog](https://dev.to/highcenbug)*

# 1.) Arrays 

- A collection of elements identified by an index or a key

### example:


<pre>
ex_arr = [1, 'string', 3, 'four']
print(ex_arr[3])
</pre>


### answer:
<pre>
four
</pre>

# 2.) Linked Lists 
- A collection of data elements, called nodes that contain a reference to the next node in the list and holds whatever data the application needs

### examples:

### the node class
<pre>
class Node(object):
    def __init__(self, val):
        self.val = val
        self.next = None

    def get_data(self):
        return self.val

    def set_data(self, val):
        self.val = val

    def get_next(self):
        return self.next

    def set_next(self, next):
        self.next = next
</pre>

### the linkedList class
<pre>
class LinkedList(object):
    def __init__(self, head=None):
        self.head = head
        self.count = 0

    def get_count(self):
        return self.count

    def insert(self, data):
        new_node = Node(data)
        new_node.set_next(self.head)
        self.head = new_node
        self.count += 1

    def find(self, val):
        item = self.head
        while (item != None):
            if item.get_data() == val:
                return item
            else:
                item = item.get_next()
        return None

    def deleteAt(self, idx):
        if idx > self.count:
            return
        if self.head == None:
            return
        else:
            tempIdx = 0
            node = self.head
            while tempIdx < idx-1:
                node = node.get_next()
                tempIdx += 1
            node.set_next(node.get_next().get_next())
            self.count -= 1

    def dump_list(self):
        tempnode = self.head
        while (tempnode != None):
            print("Node: ", tempnode.get_data())
            tempnode = tempnode.get_next()
</pre>

### create a linked list and insert some items

<pre>
itemlist = LinkedList()
itemlist.insert(38)
itemlist.insert(49)
itemlist.insert(13)
itemlist.insert(15)

itemlist.dump_list()
</pre>

### exercise the list

<pre>
print("Item count: ", itemlist.get_count())
print("Finding item: ", itemlist.find(13))
print("Finding item: ", itemlist.find(78))
</pre>

### delete an item

<pre>
itemlist.deleteAt(3)
print("Item count: ", itemlist.get_count())
print("Finding item: ", itemlist.find(38))
itemlist.dump_list()
</pre>

### answer:
<pre>
Node:  15
Node:  13
Node:  49
Node:  38
Item count:  4
Finding item:  <__main__.Node object at 0x106568990>
Finding item:  None
Item count:  3
Finding item:  None
Node:  15
Node:  13
Node:  49
</pre>

# 3.) Stacks and Queues
- Stacks is a collection of operations that supports push and pop operations. The last item pushed is the first one popped.

### example:

### create a new empty stack
<pre>

stack = []
</pre>

### push items onto the stack
<pre>
stack.append(1)
stack.append(2)
stack.append(3)
stack.append(4)
</pre>

### print the stack contents
<pre>
print(stack)
</pre>

### pop an item off the stack
<pre>
x = stack.pop()
print(x)
print(stack)
</pre>

### answer:

<pre>
[1, 2, 3, 4]
4
[1, 2, 3]
</pre> 

- A Stack is a collection of operations that supports push and pop operations. The last item pushed is the first one popped.

### example:

<pre>
from collections import deque
</pre>

### create a new empty deque object that will function as a queue
<pre>
queue = deque()
</pre>

### add some items to the queue

<pre>
queue.append(1)
queue.append(2)
queue.append(3)
queue.append(4)
</pre>

### print the queue contents

<pre>
print(queue)
</pre>

### pop an item off the front of the queue

<pre>
x = queue.popleft()
print(x)
print(queue)
</pre>

### answer:

<pre>
deque([1, 2, 3, 4])
1
deque([2, 3, 4])
</pre>

# 4.) Hash Tables (Dictionary)
- A data structure that maps keys to its associated values

### Benefits:
- Key-to-value maps are unique
- Hash tables are very fast
- For small datasets, arrays are usually more efficient
- Hash tables don't order entries in a predictable way

### example:

#### create a hashtable all at once
<pre>
items1 = dict(
        {
            "key1": 1, 
            "key2": 2, 
            "key3": "three"
        }
    )
print(items1)
</pre>

### create a hashtable progressively
<pre>
items2 = {}
items2["key1"] = 1
items2["key2"] = 2
items2["key3"] = 3
print(items2)
</pre>

### replace an item

<pre>
items2["key2"] = "two"
print(items2)
</pre>

### iterate the keys and values in the dictionary

<pre>
for key, value in items2.items():
    print("key: ", key, " value: ", value)
</pre>

### Answer:

<pre>
{'key1': 1, 'key2': 2, 'key3': 'three'}
{'key1': 1, 'key2': 2, 'key3': 3}
{'key1': 1, 'key2': 'two', 'key3': 3}
key:  key1  value:  1
key:  key2  value:  two
key:  key3  value:  3
</pre>

#Real World Examples:

### Filter out duplicate items

### define a set of items that we want to reduce duplicates

<pre>
items = ["apple", "pear", "orange", "banana", "apple",
         "orange", "apple", "pear", "banana", "orange",
         "apple", "kiwi", "pear", "apple", "orange"]
</pre>

### create a hashtable to perform a filter

<pre>
filter = dict()
</pre>

### loop over each item and add to the hashtable
<pre>
for item in items:
    filter[item] = 0
</pre>

### create a set from the resulting keys in the hashtable

<pre>
result = set(filter.keys())
print(result)
</pre>

### output:

<pre>
{
    'kiwi',
    'apple',
    'pear',
    'orange',
    'banana'
}
</pre>

### Find a maximum value

### declare a list of values to operate on

<pre>
items = [6, 20, 8, 19, 56, 23, 87, 41, 49, 53]

def find_max(items):
    # breaking condition: last item in list? return it
    if len(items) == 1:
        return items[0]

    # otherwise get the first item and call function
    # again to operate on the rest of the list
    op1 = items[0]
    print(op1)
    op2 = find_max(items[1:])
    print(op2)

    # perform the comparison when we're down to just two
    if op1 > op2:
        return op1
    else:
        return op2
</pre>

### test the function

<pre>
print(find_max(items))
</pre>

### output:
<pre>
6
20
8
19
56
23
87
41
49
53
53
53
87
87
87
87
87
87
87
</pre>

### Counting Items

### define a set of items that we want to count

<pre>
items = ["apple", "pear", "orange", "banana", "apple",
         "orange", "apple", "pear", "banana", "orange",
         "apple", "kiwi", "pear", "apple", "orange"]
</pre>

### create a hashtable object to hold the items and counts

<pre>
counter = dict()
</pre>

### iterate over each item and increment the count for each one
<pre>
for item in items:
    if item in counter.keys():
        counter[item] += 1
    else:
        counter[item] = 1
</pre>

### print the results

<pre>
print(counter)
</pre>

### output:
<pre>
{'apple': 5, 'pear': 3, 'orange': 4, 'banana': 2, 'kiwi': 1}

## Conclusion:

Beginners have to get familiar with different kinds of data structures to survive the tech world. These are the four most common and most used data structures that senior developers reference to when developing softwares or applications.
