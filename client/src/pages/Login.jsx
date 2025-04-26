import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {

    const [SignupInput, SetSignupInput] = useState({name:"", email:"", password:""});
    const [LoginInput, SetLoginInput] = useState({email:"", password:""});

    const changeInputHandler = (e, type)=>{
            const {name, value} = e.target
            if(type === "signup"){
                SetSignupInput({...SignupInput, [name]:value});
            }else{
                SetLoginInput({...LoginInput, [name]:value});
            }
    }


    const handleSubmit = (type) => {
            const inputData = type === "signup" ? SignupInput : LoginInput;
            console.log(inputData)
    }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Sign up</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>



      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            
              <Label htmlFor="username">Name</Label>
            <div className="space-y-1">
              <Input id="name" name="name" value={SignupInput.name} onChange={(e)=> changeInputHandler(e, "signup")} placeholder='Eg:manish' required="true"/>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={LoginInput.email} onChange={(e)=> changeInputHandler(e, "signup")} placeholder='Eg:Manish@gmail.com' required="true" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" value={LoginInput.password} onChange={(e)=> changeInputHandler(e, "signup")} placeholder='Eg:ab21' required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>{handleSubmit("signup")}}>Signup</Button>
          </CardFooter>
        </Card>
      </TabsContent>




      <TabsContent value="login">
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>
        Change your password here. After saving, you'll be logged out.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="current">Email</Label>
        <Input
          id="current"
          name="email"
          value={LoginInput.email} // ✅ Corrected
          onChange={(e) => changeInputHandler(e, "login")}
          type="email"
          placeholder="Eg:Manish@gmail.com"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="new">Password</Label>
        <Input
          id="new"
          name="password"
          value={LoginInput.password} // ✅ Corrected
          onChange={(e) => changeInputHandler(e, "login")}
          type="password"
          placeholder="Eg:ab21"
          required
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button onClick={() => handleSubmit("login")}>Login</Button>
    </CardFooter>
  </Card>
</TabsContent>

    </Tabs>
    </div>

    
  )
}

export default Login 
