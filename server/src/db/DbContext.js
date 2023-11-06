import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { RoutineSchema } from '../models/Routine.js';
import { MoveSchema } from '../models/Move.js';
import { ListEntrySchema } from '../models/ListEntry.js';
import { RestSchema } from '../models/Rest.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Routines = mongoose.model('Routine', RoutineSchema);
  Moves = mongoose.model('Move', MoveSchema);
  ListEntries = mongoose.model('ListEntry', ListEntrySchema);
  Rests = mongoose.model('Rest', RestSchema);

}

export const dbContext = new DbContext()
