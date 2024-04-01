import { object, z , string, number, date, TypeOf, array } from "zod"

const signUpSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email('not valid email'),
        name: string({
            required_error: 'Name is required'
        }).min(3, 'name must be at least'),
        phone: string({
            required_error: 'Phone is required'
        }),
        password: string({
            required_error: "Password is required"
        }).min(5, 'Password to short '),

        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        }).min(5, 'Password is required'),
        

    }).refine((data) => data.password === data.passwordConfirmation ,{
        message: "Password do not match",
        path: ['Password confirmation']
    })
})
const signInSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email('not valid email'),
        password: string({
            required_error: "Password is required"
        })
    })
})
type signUpDto = TypeOf<typeof signUpSchema>['body']
type signInDto = TypeOf<typeof signInSchema>['body']
export {
    signUpDto, signUpSchema , signInDto , signInSchema
}