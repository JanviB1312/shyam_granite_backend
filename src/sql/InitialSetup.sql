CREATE TABLE products (
	id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    stock_quantity INT DEFAULT 0,
	image TEXT,
	features TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name,price,description,stock_quantity,image,features)
VALUES 
('Marble Ganesha Murti 10 inches / 5KG',200,'Beautifully crafted Marble Ganesha statue, perfect for home decor and religious purposes.',10,'D:\shyamGraniteBackend\images\marble_ganesha.jpg',ARRAY[
      'Hand-Carved',
      'Premium Marble',
      'Polished Finish',
      'Intricate Details',
      'Ideal for Gifting'
    ]),
('Brass Krishna Playing Flute 12 inches / 4KG',1800,'Exquisite brass sculpture of Lord Krishna playing the flute, radiating divine charm.',10,'D:\shyamGraniteBackend\images\brass_krishna.jpg',ARRAY[
      'Durable Brass Material',
      'Antique Finish',
      'Handcrafted',
      'Ethnic Design',
      'Perfect for Altars'
    ]
),
('Black Granite Shiva Lingam 8 inches / 7KG',6800,'Elegant black granite Shiva Lingam, a symbol of Lord Shiva''s eternal energy.',10,'D:\shyamGraniteBackend\images\shiva_lingam.webp',
ARRAY[
      'Authentic Black Granite',
      'Smooth Finish',
      'Handcrafted',
      'Durable',
      'Spiritual Significance'
    ]),
('White Marble Saraswati Statue 15 inches / 6KG',11500,'Graceful marble statue of Goddess Saraswati with her veena, perfect for prayer rooms.',10,'D:\shyamGraniteBackend\images\saraswati_statue.webp',
ARRAY[
      'Pure White Marble',
      'Intricate Carvings',
      'Hand-Painted Details',
      'Symbol of Wisdom',
      'Customizable Size'
    ]),
('Sandstone Hanuman Idol 14 inches / 10KG',8500,'Hand-carved sandstone idol of Lord Hanuman, embodying strength and devotion.',10,'D:\shyamGraniteBackend\images\hanuman_idol.png',
ARRAY[
      'Natural Sandstone',
      'Weather-Resistant',
      'Traditional Style',
      'Handcrafted',
      'Perfect for Temples'
    ]),
('Marble Durga Mata Murti 18 inches / 8KG',18500,'Stunning statue of Goddess Durga, symbolizing power and protection, carved from premium marble.',10,'D:\shyamGraniteBackend\images\durga_murti.webp',
 ARRAY[
      'Detailed Design',
      'Polished Finish',
      'Premium Marble',
      'Handcrafted',
      'Ethnic Artwork'
    ]),
('Brass Lakshmi Idol 10 inches / 3KG',7200,'Magnificent brass idol of Goddess Lakshmi, bringing prosperity and wealth.',10,'D:\shyamGraniteBackend\images\lakshmi_idol.webp',ARRAY[
      'Gold-Plated Finish',
      'Handcrafted',
      'Compact Size',
      'Durable Brass Material',
      'Ideal for Homes'
    ]),
('Granite Nandi Bull 12 inches / 5KG',9400,'Devotional Nandi bull sculpture carved from granite, ideal for temples and homes.',10,'D:\shyamGraniteBackend\images\nandi_bull.webp',
ARRAY[
      'Natural Granite',
      'Weather-Resistant',
      'Polished Finish',
      'Symbol of Devotion',
      'Customizable Size'
    ]),
('Marble Radha Krishna Idol 14 inches / 6KG',17500,'Beautifully crafted marble statue of Radha and Krishna, representing love and devotion.',10,'D:\shyamGraniteBackend\images\radha_krishna.jpg', ARRAY[
      'Pure Marble',
      'Vivid Colors',
      'Hand-Painted Details',
      'Elegant Design',
      'Perfect for Gifting'
    ]),
('Brass Buddha Statue 16 inches / 5KG',150000,'A calming brass Buddha statue with intricate detailing, ideal for meditation spaces.',10,'D:\shyamGraniteBackend\images\buddha_statue.jpg',ARRAY[
      'Solid Brass',
      'Peaceful Expression',
      'Durable Build',
      'Antique Finish',
      'Handcrafted'
    ]),
('Marble Kali Maa Idol 12 inches / 5KG',12500,'Dynamic marble idol of Goddess Kali, showcasing divine strength and power.',10,'D:\shyamGraniteBackend\images\kali_idol.jpeg',ARRAY[
      'Polished Marble',
      'Detailed Artwork',
      'Handcrafted',
      'Ethnic Design',
      'Customizable'
    ]),
('Granite Vishnu Idol 20 inches / 9KG',200000,'Divine granite idol of Lord Vishnu, perfect for temples and spiritual places.',10,'D:\shyamGraniteBackend\images\vishnu_idol.jpg',ARRAY[
      'High-Quality Granite',
      'Intricate Details',
      'Handcrafted',
      'Spiritual Significance',
      'Durable Design'
    ]),
('Brass Ganpati Statue 8 inches / 2KG',5200,'Charming brass Ganpati statue, ideal for worship and home decor.',10,'D:\shyamGraniteBackend\images\ganpati_statue.jpg',ARRAY[
      'Handcrafted',
      'Durable Brass',
      'Traditional Style',
      'Compact Design',
      'Affordable'
    ]),
('Marble Shirdi Sai Baba Idol 14 inches / 6KG',14500,'Peaceful marble statue of Sai Baba, a symbol of faith and patience.',10,'D:\shyamGraniteBackend\images\sai_baba_idol.jpeg',ARRAY[
      'Pure Marble',
      'Hand-Painted',
      'Smooth Finish',
      'Compact Size',
      'Perfect for Altars'
    ]),
('Granite Parvati Idol 18 inches / 8KG',19800,'Divine granite idol of Goddess Parvati, beautifully carved with intricate details.',10,'D:\shyamGraniteBackend\images\parvati_idol.jpg',ARRAY[
      'Natural Granite',
      'Smooth Polished Finish',
      'Durable Build',
      'Spiritual Significance',
      'Customizable Sizes'
    ]);
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    customer_id VARCHAR(50),
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(15),
	customer_address TEXT,
	customer_country TEXT,
	customer_state TEXT,
	customer_city TEXT,
    order_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
	total_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE discount (
	id SERIAL PRIMARY KEY,
	coupon_code TEXT,
	discount_percentage INT
)

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email TEXT,
	password TEXT
);

INSERT INTO users(email,password) VALUES('Admin@gmail.com','Admin123')