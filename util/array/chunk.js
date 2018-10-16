/**
 *
 * @signature `chunk(arr, size)`
 * @param  {array} arr the array to chunk
 * @param  {int} size the size of the chunk
 * @param {array} the result array of array
 *
 * ```js
 * const chunk = require("passbolt-mad/util/array/chunk");
 * const arr = [1,2,3,4,5,6,7];
 * const chunkArr = chunk(arr, 3);
 * console.log(chunkArr); // -> [[1,2,3], [4,5,6], [7]]
 * ```
 */
function chunk(arr, size) {
  return arr.reduce((chunks, el, i) => {
    if (i % size === 0) {
      chunks.push([el])
    } else {
      chunks[chunks.length - 1].push(el)
    }
    return chunks
  }, [])
}

export default chunk;