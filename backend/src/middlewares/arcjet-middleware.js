import aj from '../config/arcjet.js';
import { isSpoofedBot } from "@arcjet/inspect";


export const arcjet_protection = async(req,res,next) => {
    try {
        const decision = await aj.protect(req)

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({message : "Rate limit exceeded..Please try again later." });
            } 
            else if (decision.reason.isBot()) {
                return res.status(429).json({message : "Bot access denied!" });
            } 
            else {
                return res.status(429).json({message : "Access denied!" });
            }
       }

       //spoofed bot detection
       if (decision.results.some(isSpoofedBot)){
           return res.status(429).json({message : "Spoofed bot detected!" });
       }

       next();

    } catch (error) {
        console.log("Arcjet protection error!",error);
        next()
    }
}