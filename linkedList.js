const LinkedList = (() => {
    let head = null;
    
    const append = (value) => {
        let node = createNode(value);
        if (head == null) {
            head = node;
        }
        else {
            getTail().setNext(node);
        }
    }

    const prepend = (value) => {
        node = createNode(value);
        node.setNext(head);
        head = node;
    }

    const size = () => {
        let s = 0;
        let current = head;
        while (current != null) {
            current = current.getNext();
            s++;
        }
        return s;
    }

    const getHead = () => head;

    const getTail = () => {
        if (head == null) return head;
        let current = head;
        while (current.getNext() != null) {
            current = current.getNext();
        }
        return current;
    }

    const at = (index) => {
        let s = 0;
        let current = head;
        while (s < index) {
            if (current == null) {
                break;
            }
            current = current.getNext();
            s++;
        }
        return current;
    }

    const pop = () => {
        if (head == null) return;
        if (head.getNext() == null) {
            head = null;
            return;
        }
        let current = head;
        while (current.getNext().getNext() != null) {
            current = current.getNext();
        }
        current.setNext(null);
    }

    const toString = () => {
        let string = "";
        let current = head;
        while (current != null) {
            string += `( ${current.getValue()} ) -> `
            current = current.getNext();
        }
        string += "null";
        return string;
    }

    const insertAt = (value, index) => {
        let node = at(index);
        let copyNode = createNode(node.getValue());
        copyNode.setNext(node.getNext());
        node.setValue(value);
        node.setNext(copyNode);
    }

    const removeAt = (index) => {
        if (head == null) return;
        let s = 0;
        let current = head;
        while (s < index-1) {
            current = current.getNext();
            if (current == null) return;
            s++;
        }
        if (current.getNext() != null) {
            current.setNext(current.getNext().getNext());
        }
    }

    return {
        append,
        prepend,
        size,
        getHead,
        getTail,
        at,
        pop,
        toString,
        insertAt,
        removeAt
    }
})();

let createNode = function(v) {
    let next = null;
    let value = v;

    const getNext = () => next;
    const setNext = (n) => next = n;
    const getValue = () => value;
    const setValue = (v) => value = v;

    return { getNext, setNext, getValue, setValue }
}

LinkedList.append("Test");
LinkedList.append("Test2");
LinkedList.append("Test");
LinkedList.append("Test");
LinkedList.insertAt("Hello There!", 2);
LinkedList.append("You are a bold one!");
LinkedList.prepend("Let's go!");
console.log(LinkedList.getHead().getValue());
console.log(LinkedList.getTail().getValue());
LinkedList.pop();
LinkedList.pop();
LinkedList.pop();
console.log(LinkedList.toString());
console.log(LinkedList.size());