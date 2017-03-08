class Utils {
  static shuffle(array) {
    this.array = array;
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.array[currentIndex];
      this.array[currentIndex] = this.array[randomIndex];
      this.array[randomIndex] = temporaryValue;
    }

    return this.array;
  }
}

export { Utils as default };
