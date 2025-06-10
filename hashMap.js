function Node(key, value) {
  return { key, value, nextNode: null };
}

function LinkedList() {
  let head = null,
    tail = null,
    _size = 0;

  function append(node) {
    if (!head) {
      head = node;
      tail = node;
    } else {
      tail.nextNode = node;
      tail = node;
    }
    _size += 1;
  }

  function remove(index) {
    if (isOutOfBounds(index)) return;

    if (index === 0) {
      head = head.nextNode;
      if (_size === 1) {
        tail = null;
      }
    } else {
      const previous = getNodeAt(index - 1);
      if (!previous) return;

      const toRemove = previous.nextNode;
      previous.nextNode = toRemove.nextNode;

      if (index === _size - 1) {
        tail = previous;
      }
    }

    _size -= 1;
  }

  function search(callback) {
    let counter = 0;
    let current = head;

    while (current) {
      if (callback(current, counter)) return current;

      current = current.nextNode;
      counter += 1;
    }

    return null;
  }

  function getNodeAt(index) {
    if (isOutOfBounds(index)) return;

    let current = head;
    let counter = 0;
    while (current && counter < index) {
      current = current.nextNode;
      counter += 1;
    }
    return current;
  }

  function isOutOfBounds(index) {
    return index < 0 || index >= _size;
  }

  return Object.freeze({
    get size() {
      return _size;
    },
    search,
    append,
    remove,
    getNodeAt,
  });
}

class HashMap {
    #loadFactor;
    #capacity;
    #len;
    #arr;
    #BASE_CAPACITY;

    constructor() {
        this.#BASE_CAPACITY = 16;
        this.#loadFactor = 0.75;
        this.#capacity = this.#BASE_CAPACITY;
        this.#len = 0;
        this.#arr = new Array(this.#BASE_CAPACITY);
    }

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
        }

        return hashCode;
    }

    set(key, value) {
        let index = this.hash(key);

        if (this.#arr.at(index) == undefined) {
            this.#arr[index] = LinkedList();
        }
        // key already in list
        let keyExists = this.#arr[index].search((current, counter) => (current.key === key))
        if (keyExists != null) {
            keyExists.value = value;
        }
        else {
            this.#arr[index].append(new Node(key, value));
            this.#len++;
            if (this.#len / this.#capacity > this.#loadFactor) {
                this.expand();
            }
        }
    }

    get(key) {
        let index = this.hash(key);

        if (this.#arr[index] != undefined) {
            return this.#arr[index].search((current, counter) => (current.key === key))?.value ?? null;
        }

        return null;
    }

    has(key) {
        let index = this.hash(key);

        if (this.#arr[index] != undefined) {
            return this.#arr[index].search((current, counter) => (current.key === key)) == null ? false : true;
        }

        return false;
    }

    remove(key) {
        let index = this.hash(key);

        if (this.#arr[index] != undefined) {
            this.#arr[index].search((current, counter) => {if (current.key === key) {this.#arr[index].remove(counter);this.#len--;}});
        }
    }

    length() {
        return this.#len;
    }

    clear() {
        this.#arr = new Array(this.#BASE_CAPACITY);
        this.#len = 0;
    }

    entries() {
        let allKeysArray = [];

        for (let entry of this.#arr) {
            if (entry != undefined) {
                let current = 0;
                let newNode = entry.getNodeAt(current);
                while (newNode != null) {
                    allKeysArray.push([newNode.key, newNode.value]);
                    current++;
                    newNode = entry.getNodeAt(current);
                }
            }
        }

        return allKeysArray;
    }

    expand() {
        this.#capacity *= 2;
        this.#len = 0;
        let allItems = this.entries()
        this.#arr = new Array(this.#capacity);
        for (let entry of allItems) {
            this.set(entry[0], entry[1]);
        }
    }
}

let test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
console.log("LENGTH:", test.length())
console.log(test.entries());