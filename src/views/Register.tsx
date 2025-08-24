import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/shadcn/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/shadcn/Card";
import { Checkbox } from "../components/shadcn/Checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/shadcn/Form";
import { Input } from "../components/shadcn/Input";
import { ErrorResponseTypes } from "../constants/ErrorResponseTypes";
import CenterContainer from "../layout/CenterLayout";
import { AccountService } from "@/services/Account.service";

type RegisterForm = {
	username: string;
	email: string;
	password: string;
	confirmation_password: string;
	agreed_to_tac: boolean;
};

const Register = () => {
	const nevigate = useNavigate();
	const form = useForm();

	const [loading, setLoading] = useState(false);

	const [invalidPasswordLength, setInvalidPasswordLength] = useState(false);
	const [invalidConfirmationPassword, setInvalidConfirmationPassword] = useState(false);
	const [invalidAgreedToTAC, setInvalidAgreedToTAC] = useState(false);
	const [invalidUsername, setInvalidUsername] = useState(false);
	const [invalidEmail, setInvalidEmail] = useState(false);

	const validatedForm = (formData: RegisterForm): Boolean => {
		// Password longer than 8 characters
		const PASSWORD_LONGER_THAN_8_CHARACTERS = formData.password.length >= 8
		setInvalidPasswordLength(!PASSWORD_LONGER_THAN_8_CHARACTERS)
		// Confirmation same as password
		const CONFIRMATION_SAME_AS_PASSWORD = formData.password === formData.confirmation_password
		setInvalidConfirmationPassword(!CONFIRMATION_SAME_AS_PASSWORD)
		// Agreed to TOS
		const AGREED_TO_TAC = formData.agreed_to_tac
		setInvalidAgreedToTAC(!AGREED_TO_TAC)

		return PASSWORD_LONGER_THAN_8_CHARACTERS && CONFIRMATION_SAME_AS_PASSWORD && AGREED_TO_TAC
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true)

		setInvalidPasswordLength(false)
		setInvalidConfirmationPassword(false)
		setInvalidAgreedToTAC(false)
		setInvalidUsername(false)
		setInvalidEmail(false)

		const data = form.getValues() as RegisterForm
		if (validatedForm(data)) {
			AccountService.create({
				username: data.username,
				email: data.email,
				password: data.password,
			}).then(() => {
				nevigate("/login")
				setLoading(false)
			}).catch(error => {
				const errorType = error.response.data.message
				if (errorType === ErrorResponseTypes.DUPLICATED_USERNAME) {
					console.log("Username already exists")
					setInvalidUsername(true)
				}
				else if (errorType === ErrorResponseTypes.DUPLICATED_EMAIL) {
					console.log("Email already exists")
					setInvalidEmail(true)
				}
				setLoading(false)
			})
		}
		else {
			setLoading(false)
		}
	};

	return (
		<CenterContainer className="w-[700px]">
			<Card>
				<CardHeader>
					<CardTitle>Registration</CardTitle>
					<CardDescription>Create new account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={(e) => handleSubmit(e)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input required {...field} />
										</FormControl>
										{
											invalidUsername &&
											<FormMessage>
												Username already exists.
											</FormMessage>
										}
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input required type="email" {...field} />
										</FormControl>
										{
											invalidEmail &&
											<FormMessage>
												Email already exists.
											</FormMessage>
										}
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input required type="password" {...field} />
										</FormControl>
										{
											invalidPasswordLength &&
											<FormMessage>
												Password must be longer than 8 characters.
											</FormMessage>
										}
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmation_password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Confirmation Password
										</FormLabel>
										<FormControl>
											<Input required type="password" {...field} />
										</FormControl>
										{
											invalidConfirmationPassword &&
											<FormMessage>
												Confirmation password must be the same as password.
											</FormMessage>
										}
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="agreed_to_tac"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md pt-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel>
											I have read and agreed with{" "}
											<a className="underline" href="#">
												Terms & Conditions
											</a>
										</FormLabel>
										{
											invalidAgreedToTAC &&
											<FormMessage>
												You must agree to Terms & Conditions.
											</FormMessage>
										}
									</FormItem>
								)}
							/>

							<Button className="w-full" type="submit">
							{loading ? (
								<>
									<Loader2 className="animate-spin mr-2" />
									Registering
								</>
							) : (
								<>Register</>
							)}
							</Button>
						</form>
					</Form>

					<CardDescription className="mt-2">Already have an account? Login <a className="underline text-blue-700" href="/login">here</a></CardDescription>

				</CardContent>
			</Card>
		</CenterContainer>
	);
};

export default Register;
