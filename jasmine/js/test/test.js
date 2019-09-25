describe("calculator", function () {
    describe("addition function", function() {
        it("should return 20", function(){
            expect(multiplication(10,2)).toBe(20);
        })
        it("should return 40", function(){
            expect(multiplication(20,2)).toBe(40);
        })
        it("should generate an alert of one parameter messing", function(){
            spyOn(window, "alert");
            multiplication(2);
            expect(window.alert).toHaveBeenCalledWith("one parameter messing");
        })
        it("should generate an alert of No parameters added", function(){
            spyOn(window, "alert");
            multiplication();
            expect(window.alert).toHaveBeenCalledWith("No parameters added");
        })
        //  it("should return error", function(){
        //     expect(multiplication("a","a")).toBe("Error");
        // })
        it("should generate an alert of error", function(){
            spyOn(window, "alert");
            multiplication("a","a");
            expect(window.alert).toHaveBeenCalledWith("Error");
        })
        
    })
})