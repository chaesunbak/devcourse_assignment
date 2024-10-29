class Employee {
  constructor(
    private _empName: string,
    private _age: number,
    private _empJob: string
  ) {}

  get empName(): string {
    return this._empName;
  }

  set empName(empName: string) {
    this._empName = empName;
  }

  printEmp(): void {
    console.log(
      this._empName +
        "의 나이는" +
        this._age +
        "이고 직업은" +
        this._empJob +
        "입니다."
    );
  }
}

let emp1 = new Employee("홍길동", 30, "개발자");
emp1.printEmp();
