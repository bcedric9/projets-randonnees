# MLD


**User** = (
    user_id INT PK,
    last_name VARCHAR(255),
    first_name VARCHAR(255),
    role ENUM('client','admin'),
    tel VARCHAR(10),
    mail VARCHAR(255),
    password VARCHAR(255),
    registration_date DATE,
    is_active BOOLEAN
);

**Hike** = (
    hike_id INT PK,
    image VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    duration INT,
    level ENUM('easy','medium','hard'),
    max_participants INT,
    price DECIMAL(10,2),
    location VARCHAR(255),
    is_active BOOLEAN
);

**Guide** = (
    guide_id INT,
    last_name VARCHAR(255),
    first_name VARCHAR(255),
    bio TEXT,
    is_active BOOLEAN
);

**Booking** = (
    booking_id INT,
    booking_date DATE,
    number_participants INT,
    status ENUM('pending','confirmed','cancelled'),
    #guide_id*,
    #hike_id*,
    #user_id*
);

**Payment** = (
    payment_id INT,
    amount DECIMAL(15,2),
    payment_method ENUM('card','paypal'),
    status ENUM('pending','confirmed','cancelled'),
    #booking_id*
);

**Review** = (
    review_id INT,
    commentary TEXT,
    rating INT,
    created_at DATETIME,
    #hike_id*,
    #user_id*
);

**GuideAvailability** = (
    availability_id INT,
    available_date DATE,
    #guide_id*
);