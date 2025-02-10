# List Object Utils
This library contains utilities for working with lists and objects in JavaScript.

The functions are not exported as default, so you can import them in one of the following ways:
```javascript
// ES6
import { functionName } from '@ptolemy2002/list-object-utils';
// CommonJS
const { functionName } = require('@ptolemy2002/list-object-utils');
```

## Type Reference
```typescript
type ArrayOptional<T = any> = T[] | null | undefined;
type ObjectOptional<T = Object> = T | null | undefined;
type ObjectDifferenceResult<T> = {
    [P in keyof T]?:
        T[P] extends any[] ? Record<number, ValueOf<T[P]>>
        : T[P] extends Object ? Record<keyof T[P], ValueOf<T[P]>>
        : T[P];
};
type SortCallback = (a: number, b: number) => number;
```

## Functions
The following functions are available in the library:

### listsEqual
#### Description
Checks if two lists are equal to each other. Uses recursion to check nested lists and the `objectsEqual` function to check nested objects. If either of the operands is not a list, the function will be equivalent to a simple equality check.

#### Parameters
- `a` (`ArrayOptional`): The first list to be compared.
- `b` (`ArrayOptional`): The second list to be compared.

#### Returns
`boolean` - `true` if the lists are equal, `false` otherwise.

### objectsEqual
#### Description
Checks if two objects are equal to each other. Uses recursion to check nested objects and the `listsEqual` function to check nested lists. If either of the operands is not an object, the function will be equivalent to a simple equality check.

#### Parameters
- `a` (`ObjectOptional`): The first object to be compared.
- `b` (`ObjectOptional`): The second object to be compared.

#### Returns
`boolean` - `true` if the objects are equal, `false` otherwise.

### listSwap<T>
#### Description
Swaps two elements in a list based on the provided indices. Throws a `TypeError` if the indices are not integers and a `RangeError` if the indices are out of bounds.

#### Parameters
- `list` (`T[]`): The list in which the elements are to be swapped.
- `i` (`number`): The index of the first element to be swapped.
- `j` (`number`): The index of the second element to be swapped.

#### Returns
`T[]` - The list with the elements swapped.

### listRemove<T>
#### Description
Removes an element from a list based on the provided index. Throws a `TypeError` if the index is not an integer and a `RangeError` if the index is out of bounds.

#### Parameters
- `list` (`T[]`): The list from which the element is to be removed.
- `i` (`number`): The index of the element to be removed.

#### Returns
`T[]` - The list with the element removed.

### listPush<T>
#### Description
Pushes an element to a list based on the provided index.

#### Parameters
- `list` (`T[]`): The list to which the element is to be pushed.
- `element` (`T`): The element to be pushed.

#### Returns
`T[]` - The list with the element pushed.

### listSet<T>
#### Description
Sets an element in a list based on the provided index. Throws a `TypeError` if the index is not an integer and a `RangeError` if the index is out of bounds.

#### Parameters
- `list` (`T[]`): The list in which the element is to be set.
- `i` (`number`): The index of the element to be set.
- `element` (`T`): The element to be set.

#### Returns
`T[]` - The list with the element set.

### isSet
#### Description
Checks if a list is a set, that is, it has no duplicate elements. Element identity is determined using `Array.includes`.

#### Parameters
- `list` (`any[]`): The list to be checked.

#### Returns
`boolean` - `true` if the list is a set, `false` otherwise.

### listDifference<T>
#### Description
Finds the difference between two lists, that is, the elements that do not match between the two lists. If one list has a different value at an index than the other list at the same index, the element from the second list will be included in the result. Uses recursion to check nested lists and the `objectDifference` function to check nested objects. If either of the operands is not a list, the function will return an empty object if the operands are equal and the second operand if they are not.

#### Parameters
- `a` (`ArrayOptional<T>`): The first list to be compared.
- `b` (`ArrayOptional<T>`): The second list to be compared.

#### Returns
` ObjectOptional<Record<number, T>>` - If the operands are both lists, an object with a property for every index at which the two lists differ. The value for each property is the element from the second list. If the operands are not both lists and equal, an empty object. If the operands are not both lists and not equal, the second operand.

### objectDifference<T>
#### Description
Finds the difference between two objects, that is, the properties that do not match between the two objects. If one object has a different value for a property than the other object for the same property, the value from the second object will be included in the result. Uses recursion to check nested objects and the `listDifference` function to check nested lists. If either of the operands is not an object, the function will return an empty object if the operands are equal and the second operand if they are not.

#### Parameters
- `a` (`ObjectOptional<T>`): The first object to be compared.
- `b` (`ObjectOptional<T>`): The second object to be compared.

#### Returns
`ObjectOptional<T | ObjectDifferenceResult<T>>` - If the operands are both objects, an object with a property for every key at which the two objects differ. The value for each property is the value from the second object. If the operands are not both objects and equal, an empty object. If the operands are not both objects and not equal, the second operand.

### flattenKeys<T>
#### Description
For an object that contains properties that are also objects, this function will flatten the keys of the object to a single level. The keys will be concatenated with a period (`.`) between them. Also does this with lists. Uses recursion to flatten nested objects.

Note that empty lists and empty objects are left as-is.

#### Parameters
- `obj` (`T`): The object to be flattened.
- `prefix` (`string`): The prefix to be added to the keys. Default is an empty string.

#### Returns
`Record<string, ValueOf<T>>` - The object with the keys flattened.

### sortWithIndices<T>
#### Description
Sorts a list based on the callback provided. The difference between this function and the native `sort` function is that this function specifies the indices of the elements to the callback instead of the elements themselves.

#### Parameters
- `list` (`T[]`): The list to be sorted.
- `sort` (`SortCallback`): The callback function that will be used to sort the list. It should take two arguments, which are the indices of the elements to be compared.
- `descending` (`boolean`): If `true`, the list will be sorted in descending order. Default is `false`.

#### Returns
`T[]` - The list sorted based on the callback and the `descending` parameter.

### objectToString
#### Description
A simple implementation of `JSON.stringify` that converts undefined values to `null`.

#### Parameters
- `obj` (`Object`): The object to be converted to a string.

#### Returns
`string` - The string representation of the object.

#### Returns
`T` - The cloned object.

## Peer Dependencies
- @ptolemy2002/ts-utils^3.0.0
- is-callable^1.2.7

## Commands
The following commands exist in the project:

- `npm run uninstall` - Uninstalls all dependencies for the library
- `npm run reinstall` - Uninstalls and then Reinstalls all dependencies for the library
- `npm run example-uninstall` - Uninstalls all dependencies for the example app
- `npm run example-install` - Installs all dependencies for the example app
- `npm run example-reinstall` - Uninstalls and then Reinstalls all dependencies for the example app
- `npm run example-start` - Starts the example app after building the library
- `npm run build` - Builds the library
- `npm run release` - Publishes the library to npm without changing the version
- `npm run release-patch` - Publishes the library to npm with a patch version bump
- `npm run release-minor` - Publishes the library to npm with a minor version bump
- `npm run release-major` - Publishes the library to npm with a major version bump