const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    userType: {
        type: String,
        enum: ['client', 'artist'],
        required: [true, 'User type is required']
    },
    profileImage: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return !v || validator.isMobilePhone(v);
            },
            message: 'Please provide a valid phone number'
        }
    },
    // Artist-specific fields
    artistProfile: {
        bio: String,
        experience: Number,
        specialties: [String],
        portfolio: [String],
        pricing: {
            bridal: Number,
            event: Number,
            photoshoot: Number,
            consultation: Number
        },
        availability: {
            days: [String], // ['monday', 'tuesday', etc.]
            hours: {
                start: String, // '09:00'
                end: String    // '18:00'
            }
        },
        location: {
            address: String,
            city: String,
            state: String,
            zipCode: String
        }
    },
    // Client-specific fields
    clientProfile: {
        preferences: [String],
        skinType: String,
        allergies: [String],
        favoriteArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);