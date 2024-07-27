import { useState } from 'react';
import isCallable from 'is-callable';
import {
    listsEqual, objectsEqual, listSwap, listRemove, listPush, listSet, isSet, listDifference, objectDifference, flattenKeys, sortWithIndeces, objectToString
} from '@ptolemy2002/list-object-utils';

function symmetricTest(f, a, b, e) {
    const r1 = isCallable(e) ? e(f(a, b)) : f(a, b) === e;
    const r2 = isCallable(e) ? e(f(b, a)) : f(b, a) === e;

    if (r1 && r2) {
        return "Passed";
    } else if (!r1 && !r2) {
        return `Failed both tests: ${r1}, ${r2}`;
    } else if (!r1) {
        return `Failed forward test: ${r1}`;
    } else if (!r2) {
        return `Failed reverse test: ${r2}`;
    }
}

function App() {
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);
    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [obj, setObj] = useState({});
    const [error, setError] = useState(null);
    const [objError, setObjError] = useState(null);

    function handleListChange(setter) {
        return (e) => {
            setter(e.target.value.split(',').map(x => x.trim()));
        }
    }

    function handleIndexChange(setter) {
        return (e) => {
            const v = e.target.value;
            if (v === "" || isNaN(v) || v.includes('.') || v < 0 || v >= Math.min(list1.length, list2.length)) {
                setError(`Specify an integer between 0 and ${Math.min(list1.length, list2.length) - 1} (length of shortest list - 1) for field ${e.target.name}`);
                return;
            }
            
            setError(null);
            setter(parseInt(v));
        }
    }

    function handleObjChange(setter) {
        return (e) => {
            try {
                setter(JSON.parse(e.target.value));
                setObjError(null);
            } catch (e) {
                setObjError("Invalid JSON");
            }
        }
    }

    return (
        <div className="App p-3">
            <h1>Dynamic Tests</h1>
            <label>List 1 (comma separated): </label>
            <input type="text" name="list1" defaultValue={list1.join(',')} onChange={handleListChange(setList1)} />
            <br />

            <label>List 2 (comma separated): </label>
            <input type="text" name="list2" defaultValue={list2.join(',')} onChange={handleListChange(setList2)} />
            <br />

            <label>Index 1: </label>
            <input type="text" name="index1" defaultValue={index1} onChange={handleIndexChange(setIndex1)} />
            <br />

            <label>Index 2: </label>
            <input type="text" name="index2" defaultValue={index2} onChange={handleIndexChange(setIndex2)} />
            <br />

            {error && <><span className="text-danger">{error}</span><br /></>}

            {
                !error && <p>
                    Lists equal? {listsEqual(list1, list2).toString()} <br /> <br />

                    List 1 swap: {listSwap(list1, index1, index2).join(',')} <br />
                    List 1 remove: {listRemove(list1, index1).join(',')} <br />
                    List 1 push: {listPush(list1, 'new').join(',')} <br />
                    List 1 set: {listSet(list1, index1, 'new').join(',')} <br />
                    List 1 is set? {isSet(list1).toString()} <br /> <br />

                    List 2 swap: {listSwap(list2, index1, index2).join(',')} <br />
                    List 2 remove: {listRemove(list2, index1).join(',')} <br />
                    List 2 push: {listPush(list2, 'new').join(',')} <br />
                    List 2 set: {listSet(list2, index1, 'new').join(',')} <br />
                    List 2 is set? {isSet(list2).toString()} <br /> <br />

                    List difference: {objectToString(listDifference(list1, list2))} <br />
                </p>
            }

            <label>Object (JSON): </label>
            <input type="text" name="obj" defaultValue={JSON.stringify(obj)} onChange={handleObjChange(setObj)} />
            <br />

            {objError && <><span className="text-danger">{objError}</span><br /></>}

            {
                !objError && <p>
                    Flattened keys: {objectToString(flattenKeys(obj))}
                </p>
            }

            <h1>Static Tests</h1>
            <p>
                Comparing empty objects (expecting true): {symmetricTest(objectsEqual, {}, {}, true)} <br /> <br />

                Comparing same object within list (expecting true): {symmetricTest(listsEqual, [{a: 1}], [{a: 1}], true)} <br />
                Comparing different object within list (expecting false): {symmetricTest(objectsEqual, [{a: 1}], [{a: 2}], false)} <br /> <br />

                Comparing same list within object (expecting true): {symmetricTest(objectsEqual, {a: [1]}, {a: [1]}, true)} <br />
                Comparing different list within object (expecting false): {symmetricTest(objectsEqual, {a: [1]}, {a: [2]}, false)} <br /> <br />

                Comparing same list within list (expecting true): {symmetricTest(listsEqual, [[1]], [[1]], true)} <br />
                Comparing different list within list (expecting false): {symmetricTest(objectsEqual, [[1]], [[2]], false)} <br /> <br />

                Comparing same object within object (expecting true): {symmetricTest(objectsEqual, {a: {b: 1}}, {a: {b: 1}}, true)} <br />
                Comparing different object within object (expecting false): {symmetricTest(objectsEqual, {a: {b: 1}}, {a: {b: 2}}, false)} <br /> <br />

                Comparing same lists 3 layers deep (expecting true): {symmetricTest(listsEqual, [[[1]]], [[[1]]], true)} <br />
                Comparing different lists 3 layers deep (expecting false): {symmetricTest(objectsEqual, [[[1]]], [[[2]]], false)} <br /> <br />

                Comparing same objects 3 layers deep (expecting true): {symmetricTest(objectsEqual, {a: {b: {c: 1}}}, {a: {b: {c: 1}}}, true)} <br />
                Comparing different objects 3 layers deep (expecting false): {symmetricTest(objectsEqual, {a: {b: {c: 1}}}, {a: {b: {c: 2}}}, false)} <br /> <br />

                Comparing empty list with non-empty list (expecting false): {symmetricTest(listsEqual, [], [1], false)} <br />
                Comparing empty object with non-empty object (expecting false): {symmetricTest(objectsEqual, {}, {a: 1}, false)} <br /> <br />

                Comparing empty list with empty object (expecting false): {symmetricTest(listsEqual, [], {}, false)} <br />
                Comparing empty object with empty list (expecting false): {symmetricTest(objectsEqual, {}, [], false)} <br /> <br />

                Comparing non-empty list with non-empty object (expecting false): {symmetricTest(listsEqual, [1], {0: 1}, false)} <br />
                Comparing non-empty object with non-empty list (expecting false): {symmetricTest(objectsEqual, {0: 1}, [1], false)} <br /> <br />

                Sorting list with indices (ascending): {(() => {
                    const list = [3, 1, 2];
                    const sorted = sortWithIndeces(list, (a, b) => list[a] - list[b], false);
                    return sorted.join(',') === '1,2,3' ? "Passed" : "Failed";
                })()} <br />
                Sorting list with indices (descending): {(() => {
                    const list = [3, 1, 2];
                    const sorted = sortWithIndeces(list, (a, b) => list[a] - list[b], true);
                    return sorted.join(',') === '3,2,1' ? "Passed" : "Failed";
                })()} <br /> <br />

                Difference between empty objects (expecting empty object): {symmetricTest(objectDifference, {}, {}, (v) => Object.keys(v).length === 0)} <br />
                Difference between empty objects within list (expecting empty object): {symmetricTest(listDifference, [{}], [{}], (v) => {
                    console.log(v);
                    return Object.keys(v).length === 0
                })} <br />
                Difference between same objects (expecting empty object): {symmetricTest(objectDifference, {a: 1}, {a: 1}, (v) => Object.keys(v).length === 0)} <br /> <br />

                Difference between objects with different keys (expecting object with "a === undefined and b === 1"): {(() => {
                    const v = objectDifference({a: 1}, {b: 1});
                    return Object.keys(v).length === 2 && v.a === undefined && v.b === 1 ? "Passed" : "Failed";
                })()} <br />
                Difference between objects with different values (expecting object with "a === 2"): {(() => {
                    const v = objectDifference({a: 1}, {a: 2});
                    return Object.keys(v).length === 1 && v.a === 2 ? "Passed" : "Failed";
                })()} <br /> <br />

                Difference between object within object with different values (expecting object with "a.b === 2"): {(() => {
                    const v = objectDifference({a: {b: 1}}, {a: {b: 2}});
                    return Object.keys(v).length === 1 && v.a.b === 2 ? "Passed" : "Failed";
                })()} <br />
                Difference between object within object with different keys (expecting object with "a.b === undefined and a.c === 1"): {(() => {
                    const v = objectDifference({a: {b: 1}}, {a: {c: 1}});
                    return Object.keys(v).length === 1 && Object.keys(v.a).length === 2 && v.a.b === undefined && v.a.c === 1 ? "Passed" : "Failed";
                })()} <br /> <br />

                Difference between list within object with different values (expecting object with "a[0] === 2"): {(() => {
                    const v = objectDifference({a: [1]}, {a: [2]});
                    return Object.keys(v).length === 1 && v.a[0] === 2 ? "Passed" : "Failed";
                })()} <br />
                Difference between list within object with different lengths (expecting object with "a[1] === 2"): {(() => {
                    const v = objectDifference({a: [1]}, {a: [1, 2]});
                    return Object.keys(v).length === 1 && v.a[1] === 2 ? "Passed" : "Failed";
                })()} <br /> <br />

                Difference between object within list with different values (expecting object with "0.a === 2"): {(() => {
                    const v = listDifference([{a: 1}], [{a: 2}]);
                    return Object.keys(v).length === 1 && v[0].a === 2 ? "Passed" : "Failed";
                })()} <br />
                Difference between object within list with different keys (expecting object with "0.a === undefined and 0.b === 2"): {(() => {
                    const v = listDifference([{a: 1}], [{b: 2}]);
                    return Object.keys(v).length === 1 && Object.keys(v[0]).length === 2 && v[0].a === undefined && v[0].b === 2 ? "Passed" : "Failed";
                })()} <br /> <br />

                Difference between list within list with different values (expecting object with "0[0] === 2"): {(() => {
                    const v = listDifference([[1]], [[2]]);
                    return Object.keys(v).length === 1 && Object.keys(v[0]).length === 1 && v[0][0] === 2 ? "Passed" : "Failed";
                })()} <br />
                Difference between list within list with different lengths (expecting object with "0[1] === 2"): {(() => {
                    const v = listDifference([[1]], [[1, 2]]);
                    return Object.keys(v).length === 1 && Object.keys(v[0]).length === 1 && v[0][1] === 2 ? "Passed" : "Failed";
                })()}
            </p>
        </div>
    );
}

export default App;
