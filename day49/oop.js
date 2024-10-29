var Employee = /** @class */ (function () {
    function Employee(_empName, _age, _empJob) {
        this._empName = _empName;
        this._age = _age;
        this._empJob = _empJob;
    }
    Object.defineProperty(Employee.prototype, "empName", {
        get: function () {
            return this._empName;
        },
        set: function (empName) {
            this._empName = empName;
        },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.printEmp = function () {
        console.log(this._empName +
            "의 나이는" +
            this._age +
            "이고 직업은" +
            this._empJob +
            "입니다.");
    };
    return Employee;
}());
var emp1 = new Employee("홍길동", 30, "개발자");
emp1.printEmp();
