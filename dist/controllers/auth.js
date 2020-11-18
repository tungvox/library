"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client('765939231519-o35chvevngta54m1mirgdqhpesfosf52.apps.googleusercontent.com');
exports.googleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId } = req.body;
    const client = new google_auth_library_1.OAuth2Client('765939231519-o35chvevngta54m1mirgdqhpesfosf52.apps.googleusercontent.com');
    function verify() {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield client.verifyIdToken({
                idToken: tokenId,
                audience: '765939231519-o35chvevngta54m1mirgdqhpesfosf52.apps.googleusercontent.com',
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
        });
    }
    verify().catch(console.error);
});
//# sourceMappingURL=auth.js.map