# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_24_172628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "brands", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "country", null: false
    t.text "description"
    t.text "image_url"
    t.uuid "approved_by_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["approved_by_id"], name: "index_brands_on_approved_by_id"
    t.index ["name"], name: "index_brands_on_name", unique: true
  end

  create_table "incense_statistics", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "incenses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.text "image_url"
    t.uuid "brand_id", null: false
    t.uuid "approved_by_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["approved_by_id"], name: "index_incenses_on_approved_by_id"
    t.index ["brand_id"], name: "index_incenses_on_brand_id"
  end

  create_table "ingredient_classifications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "incense_id", null: false
    t.uuid "ingredient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["incense_id"], name: "index_ingredient_classifications_on_incense_id"
    t.index ["ingredient_id"], name: "index_ingredient_classifications_on_ingredient_id"
  end

  create_table "ingredients", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "reviews", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "incense_id", null: false
    t.uuid "user_id", null: false
    t.integer "price_paid"
    t.integer "rating", default: 2
    t.text "review_body"
    t.integer "burn_time"
    t.integer "year_purchased"
    t.integer "sweet", default: 0, null: false
    t.integer "smokey", default: 0, null: false
    t.integer "woody", default: 0, null: false
    t.integer "ethereal", default: 0, null: false
    t.integer "savory", default: 0, null: false
    t.integer "fruity", default: 0, null: false
    t.integer "citrus", default: 0, null: false
    t.integer "herbal", default: 0, null: false
    t.integer "spicy", default: 0, null: false
    t.integer "floral", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["incense_id"], name: "index_reviews_on_incense_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.integer "role", default: 0, null: false
    t.datetime "disabled_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "encrypted_password", limit: 128
    t.string "confirmation_token", limit: 128
    t.string "remember_token", limit: 128
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["remember_token"], name: "index_users_on_remember_token"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "brands", "users", column: "approved_by_id"
  add_foreign_key "incenses", "brands"
  add_foreign_key "incenses", "users", column: "approved_by_id"
  add_foreign_key "ingredient_classifications", "incenses"
  add_foreign_key "ingredient_classifications", "ingredients"
  add_foreign_key "reviews", "incenses"
  add_foreign_key "reviews", "users"
end
