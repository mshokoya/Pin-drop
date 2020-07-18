import {Schema, model} from 'mongoose';
import {IUserDoc} from './types';
import {toHash} from '../utils/hash';

const userSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  pins: {
    type: Schema.Types.ObjectId,
    ref: 'Pin'
  },
  token: {
    type: String,
  },
  accountType: {
    type: String
  }
}, {
  toJSON: {
    transform(_,ret){
      ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
    }
  }
}
);

userSchema.pre<IUserDoc>('save', async function(){
  if(this.isModified('password')){
    const hashedPassword = await toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
});

const Users = model<IUserDoc>('Users', userSchema)

export {Users};