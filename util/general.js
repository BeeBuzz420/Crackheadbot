class GeneralUtils {
  static list(array, lastSeparator) {
    let text = "";

    for (let i = 0; i < array.length; i++) {
      if (i == 0) {
        text += array[i];
      } else if (i == array.length - 1) {
        text += ` ${lastSeparator} ${array[i]}`;
      } else {
        text += `, ${array[i]}`;
      }
    }

    return text;
  }

  static shuffleArray(array) {
    let counter = array.length;

    while (counter) {
      let index = Math.floor(Math.random() * counter);

      counter--;

      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  static capitalize(string) {
    let splitted = string.trim().split("");
    splitted[0] = splitted[0].toUpperCase();
    return splitted.join("");
  }

  static wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  static trim(string, maxLength) {
    if (string.length > maxLength) {
      return string.slice(0, maxLength - 3) + "...";
    } else return string;
  }

  /**
   * Get the average between an array of numbers
   * @param {number[]} arr
   */
  static averagenum(arr) {
    const total = arr.reduce((prev, curr) => prev + curr, 0);
    const average = total / arr.length;

    return average.toFixed(2);
  }
}

module.exports = GeneralUtils;
