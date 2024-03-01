import { handleError } from "../utils";
import { connectToDatabase } from "../databse/mongoose";
import User from "../databse/models/user.model";
import { revalidatePath } from "next/cache";

// Create
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// Read
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// Update
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updateUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updateUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updateUser));
  } catch (error) {
    handleError(error);
  }
}

// Delete
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // find user to delete
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error("User not found");

    //Deleted User
    const deletedUser = await User.findOneAndDelete(userToDelete._id);

    // ! Need to check
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USe Credits
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredit = await User.findOneAndUpdate(
      { clerkId: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );
    if (!updatedUserCredit) throw new Error("User credit update failed");
    return JSON.parse(JSON.stringify(updatedUserCredit));
  } catch (error) {
    handleError(error);
  }
}
