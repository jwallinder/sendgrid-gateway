import { Router } from 'express';
import sgMail from '@sendgrid/mail';

export default ({ config }) => {
	let api = Router();

	// expose some API metadata at the root
	api.post('/', (req, res) => {

		const mailConfig = req.body;

		console.log('incoming mailConfig:', mailConfig)
			
		mailConfig.templateId = process.env.SENDGRID_WELCOME_TEMPLATEID;

		console.log('mailConfig:', mailConfig)


		const apikey = process.env.SENDGRID_APIKEY
		console.log('apikey:', apikey)
		sgMail.setApiKey(apikey);

		var result;

		sgMail.send(mailConfig)
		.then(() => {
			result = "OK"
			res.json({
				result
			});
		})
		.catch(error => {

			//Log friendly error
			console.error(error.toString());

			//Extract error msg
			const { message, code, response } = error;
			console.error('error: ', error)

			
			const respCode = code || 500
			result = respCode + ' - ' + message;
			
			res.sendStatus(respCode)
			
			
		});

		console.log('sending the result ', result);

	});

	return api;
}

