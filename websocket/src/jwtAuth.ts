import jwt from 'jsonwebtoken';

export async function jwtAuthenticator(request: any) {
	// console.log('-> Middleware: jwtAuthenticator');
	try {
		const cookies: string = request.headers.cookie || '';
		const tokenC = cookies.split('; ')
							.find(row => row.startsWith('jwt='))
							?.split('=')[1];
		if (!tokenC)
			throw new Error('❌ No token found in cookies');

		const payload = jwt.verify(tokenC, process.env.JWT_SECRET as string);
		return payload;
	} 
	catch {
		throw new Error('❌ Invalid or expired token'); // in case some other function error
	}
}
