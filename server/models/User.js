import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// Plugin passport-local-mongoose to add password handling
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', UserSchema);

export default User;
