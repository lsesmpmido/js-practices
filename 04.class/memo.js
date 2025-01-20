class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  firstLine() {
    return this.content.split("\n")[0];
  }
}

export default Memo;
