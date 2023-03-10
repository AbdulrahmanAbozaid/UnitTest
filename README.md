# Unit Test Task Code

**_Testing User Model Controller Functions_**

## Testing Details

1. _GET /getAllUsers_

```JS
    test("Should return status 200", async () => {
        const res = await request(app)
            .get("/users/getAllUsers")
            .set("Authorization", `bearer ${TOKEN}`);
        expect(res.body.code).toBe(200);
    });

    test("Should return Unauthorized", async () => {
        const res = await request(app).get("/users/getAllUsers");
        expect(res.body.msg).toBe("Unauthorized! token not found");
    });
```

2. _POST /register_

```JS
      let user = {
        firstName: "Abdo",
        lastName: "Ahmed",
        userName: "AbdoAhmed4577",
        email: "faravok2@breazeim.com",
        password: "Ahmkmko45",
        isActive: true,
        favTeam: "t4",
        age: "21",
        role: "user",
      };

      test("Should return status 201 ", async () => {
        const res = await request(app).post("/users/register").send(user);
        expect(res.body.code).toBe(201);
      }, 6000);

      test("Should return message 'Field is Required'", async () => {
        const res = await request(app).post("/users/register").send({});
        expect(res.body.msg).toBe("Field is Required");
      });

      test("Should return Password Fail message", async () => {
        user.password = "456";
        const res = await request(app).post("/users/register").send(user);
        expect(res.body.msg).toBe(
          "password must contain Minimum eight characters, at least one letter and one number"
        );
        user.password = "ghvhgggvbuGG45";
      });

      test("Should return Email Fail message", async () => {
        user.email = "name@email.dsg";
        const res = await request(app).post("/users/register").send(user);
        expect(res.body.msg).toBe("Please enter a valid email");
        user.email = "name@email.com";
      });

      test("Should return Email Fail message", async () => {
        user.email = "namemail.dsg";
        const res = await request(app).post("/users/register").send(user);
        expect(res.body.msg).toBe("Please enter a valid email");
        user.email = "name@mail.dsg";
      });

      test("Should return Age Fail message", async () => {
        let user = {
          firstName: "Abdo",
          lastName: "Ahmed",
          userName: "AbdoAhmed4577",
          email: "faravok2@breazeim.com",
          password: "Ahmkmko45",
          isActive: true,
          favTeam: "t4",
          age: "54",
          role: "user",
        };
        const res = await request(app).post("/users/register").send(user);
        expect(res.body.msg).toBe("maximum acceptable age is 35");
      });

      it("Should return Username Fail message", async () => {
        let user = {
          firstName: "Abdo",
          lastName: "Ahmed",
          userName: "AbdoAhmed**4577",
          email: "faravok2@breazeim.com",
          password: "Ahmkmko45",
          isActive: true,
          favTeam: "t4",
          age: "54",
          role: "user",
        };
        const res = await request(app).post("/users/register").send(user);
        expect(res.body.msg).toBe("Please Enter a Valid userName");
      });
```

3. _DELETE /deleteUser/:id_

```JS
      it("Should return Code 404", async () => {
        const res = await request(app)
          .delete("/users/deleteUser/640b99c763c725ceff674aa0")
          .set("Authorization", `bearer ${TOKEN}`);
        expect(res.body.code).toBe(404);
      });

      it("Should return Code 200", async () => {
        const {
          body: {
            user: { _id: id },
          },
        } = await request(app).post("/users/register").send({
          firstName: "Abdo",
          lastName: "Ahmed",
          userName: "AbdoAhmed4577",
          email: "fknknkn@breazeim.com",
          password: "Ahmkmko45",
          isActive: true,
          favTeam: "t4",
          age: "21",
          role: "user",
        });

        const res = await request(app)
          .delete(`/users/deleteUser/${id}`)
          .set("Authorization", `bearer ${TOKEN}`);
        expect(res.body.code).toBe(200);
       }, 3000);
```

4. _PUT /updateUser/:id_

```JS
     it("Should return statusCode 200", async () => {
        const res = await request(app)
          .put("/users/updateUser/640b97b36f90cc94181044c2")
          .send({
            userName: "AbdoAbuzid322",
          })
          .set("Authorization", `bearer ${TOKEN}`);
        expect(res.body.code).toBe(200);
      });


      it("Should return Unauthorized! message", async () => {
        const res = await request(app)
          .put("/users/updateUser/640b97b36f90cc94181044c2")
          .send({
            userName: "AbdoAbuzid322",
          });
        expect(res.body.msg).toBe("Unauthorized! token not found");
      });


      it("Should return Username Fail Message", async () => {
        const res = await request(app)
          .put("/users/updateUser/640b97b36f90cc94181044c2")
          .send({
            userName: "AbdoAbuzid322***",
          })
          .set("Authorization", `bearer ${TOKEN}`);
        expect(res.body.msg).toBe("Please Enter a Valid Name");
      });


      it("Should return statusCode 401", async () => {
        await request(app).post("/users/register").send({
          firstName: "Abdo",
          lastName: "Ahmed",
          userName: "AbdoAhmed4577",
          email: "fknkn454kn@breazeim.com",
          password: "Ahmkmko45",
          isActive: true,
          favTeam: "t4",
          age: "21",
          role: "user",
        });
        const {
          body: { token: testToken },
        } = await request(app)
          .post("/users/login")
          .send({ email: "fknkn454kn@breazeim.com", password: "Ahmkmko45" });
        const res = await request(app)
          .put("/users/updateUser/640b97b36f90cc94181044c2")
          .send({
            userName: "AbdoAbuzid322",
          })
          .set("Authorization", `bearer ${testToken}`);
        expect(res.body.code).toBe(401);
      }, 3000);
```
