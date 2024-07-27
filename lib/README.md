# List Object Utils
This library contains utilities for working with lists and objects in JavaScript.

The functions are not exported as default, so you can import them in one of the following ways:
```
// ES6
import { functionName } from '@ptolemy2002/list-object-utils';
// CommonJS
const { functionName } = require('@ptolemy2002/list-object-utils');
```

## Functions
The following functions are available in the library:

### listsEqual
#### Description
Checks if two lists are equal to each other. Uses recursion to check nested lists and the `objectsEqual` function to check nested objects. If either of the operands is not an array, the function will return `false`.

#### Parameters
- `a` (Array): The first list to be compared.
- `b` (Array): The second list to be compared.

#### Returns
`Boolean` - `true` if the lists are equal, `false` otherwise.

### objectsEqual
#### Description
Checks if two objects are equal to each other. Uses recursion to check nested objects and the `listsEqual` function to check nested lists. If either of the operands is not an object, the function will return `false`. This check also applies to arrays.

#### Parameters
- `a` (Object): The first object to be compared.
- `b` (Object): The second object to be compared.

#### Returns
`Boolean` - `true` if the objects are equal, `false` otherwise.

### listSwap
#### Description
Swaps two elements in a list based on the provided indices.

#### Parameters
- `list` (Array): The list in which the elements are to be swapped.
- `i` (Number): The index of the first element to be swapped.
- `j` (Number): The index of the second element to be swapped.

#### Returns
`Array` - The list with the elements swapped.

### listRemove
#### Description
Removes an element from a list based on the provided index.

#### Parameters
- `list` (Array): The list from which the element is to be removed.
- `i` (Number): The index of the element to be removed.

#### Returns
`Array` - The list with the element removed.

### listPush
#### Description
Pushes an element to a list based on the provided index.

#### Parameters
- `list` (Array): The list to which the element is to be pushed.
- `element` (Any): The element to be pushed.

#### Returns
`Array` - The list with the element pushed.

### listSet
#### Description
Sets an element in a list based on the provided index.

#### Parameters
- `list` (Array): The list in which the element is to be set.
- `i` (Number): The index of the element to be set.
- `element` (Any): The element to be set.

#### Returns
`Array` - The list with the element set.

### isSet
#### Description
Checks if a list is a set, that is, it has no duplicate elements.

#### Parameters
- `list` (Array): The list to be checked.

#### Returns
`Boolean` - `true` if the list is a set, `false` otherwise.

### listDifference
#### Description
Finds the difference between two lists, that is, the elements that do not match between the two lists. If one list has a different value at an index than the other list at the same index, the element from the second list will be included in the result. Uses recursion to check nested lists and the `objectDifference` function to check nested objects.

#### Parameters
- `a` (Array): The first list to be compared.
- `b` (Array): The second list to be compared.

#### Returns
`Object` - An object with a property for every index at which the two lists differ. The value for each property is the element from the second list.

### objectDifference
#### Description
Finds the difference between two objects, that is, the properties that do not match between the two objects. If one object has a different value for a property than the other object for the same property, the value from the second object will be included in the result. Uses recursion to check nested objects and the `listDifference` function to check nested lists.

#### Parameters
- `a` (Object): The first object to be compared.
- `b` (Object): The second object to be compared.

#### Returns
`Object` - An object with a property for every property that differs between the two objects. The value for each property is the value from the second object.

### flattenKeys
#### Description
For an object that contains properties that are also objects, this function will flatten the keys of the object to a single level. The keys will be concatenated with a period (`.`) between them. Also does this with lists. Uses recursion to flatten nested objects.

Note that empty lists and empty objects are left as-is.

#### Parameters
- `obj` (Object): The object to be flattened.
- `prefix` (String): The prefix to be added to the keys. Default is an empty string.

#### Returns
`Object` - The object with the keys flattened.

### sortWithIndices
#### Description
Sorts a list based on the callback provided. The difference between this function and the native `sort` function is that this function specifies the indices of the elements to the callback instead of the elements themselves.

#### Parameters
- `list` (Array): The list to be sorted.
- `sort` (Function): The callback function that will be used to sort the list. It should take two arguments, which are the indices of the elements to be compared.
- `descending` (Boolean): If `true`, the list will be sorted in descending order. Default is `false`.

#### Returns
`Array` - The sorted list.

### objectToString
#### Description
A simple implementation of `JSON.stringify` that converts undefined values to `null`.

#### Parameters
- `obj` (Object): The object to be converted to a string.

#### Returns
`String` - The string representation of the object.

## Meta
This is a React Library Created by Ptolemy2002's [cra-template-react-library](https://www.npmjs.com/package/@ptolemy2002/cra-template-react-library) template in combination with [create-react-app](https://www.npmjs.com/package/create-react-app). It contains methods of building and publishing your library to npm.
For now, the library makes use of React 18 and does not use TypeScript.

## Peer Dependencies
This project does not have any peer dependencies, so it should work out of the box.

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