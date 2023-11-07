import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { RoutineSchema } from '../models/Routine.js';
import { MoveSchema } from '../models/Move.js';
import { ListEntrySchema } from '../models/ListEntry.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Routines = mongoose.model('Routine', RoutineSchema);
  Moves = mongoose.model('Move', MoveSchema);
  ListEntries = mongoose.model('ListEntry', ListEntrySchema);

}

export const dbContext = new DbContext()
