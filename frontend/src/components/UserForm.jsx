const liste_pays = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", 
  "Antigua-et-Barbuda", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche", 
  "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", 
  "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", 
  "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-Vert", 
  "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo-Brazzaville", "Congo-Kinshasa", 
  "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d’Ivoire", "Croatie", "Cuba", "Danemark", 
  "Djibouti", "Dominique", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", 
  "Estonie", "Eswatini", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", 
  "Gambie", "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée équatoriale", 
  "Guinée-Bissau", "Guyana", "Haïti", "Honduras", "Hongrie", "Îles Cook", "Îles Marshall", 
  "Îles Salomon", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie", 
  "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït", 
  "Laos", "Lesotho", "Lettonie", "Liban", "Libéria", "Libye", "Liechtenstein", "Lituanie", 
  "Luxembourg", "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", 
  "Malte", "Maroc", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", 
  "Mongolie", "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", 
  "Nigeria", "Niue", "Norvège", "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", 
  "Palaos", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", 
  "Philippines", "Pologne", "Portugal", "Qatar", "République centrafricaine", "République dominicaine", 
  "République tchèque", "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Saint-Christophe-et-Niévès", 
  "Saint-Marin", "Saint-Vincent-et-les-Grenadines", "Sainte-Lucie", "Salvador", "Samoa", "Sao Tomé-et-Principe", 
  "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", 
  "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie", "Tadjikistan", "Tanzanie", 
  "Tchad", "Thaïlande", "Timor oriental", "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", 
  "Turquie", "Tuvalu", "Ukraine", "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Viêt Nam", "Yémen", "Zambie", "Zimbabwe"
];
import React, { useState, useEffect } from "react";

const FormUser = ({ initialData, updateUserData }) => {
const [formData, setFormData] = useState(initialData);
const [showConfirmation, setShowConfirmation] = useState(false);
const [formModified, setFormModified] = useState(false);

useEffect(() => {
  setFormData(initialData);
}, [initialData]);

useEffect(() => {
  const isFormModified =
    formData.firstName !== initialData.firstName ||
    formData.lastName !== initialData.lastName ||
    formData.email !== initialData.email ||
    formData.phoneNumber !== initialData.phoneNumber ||
    formData.country !== initialData.country ||
    formData.gender !== initialData.gender ||
    formData.commune !== initialData.commune;

  setFormModified(isFormModified);
}, [formData, initialData]);

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const handleInputChange = (e) => {
  const { name, value } = e.target;

  let formattedValue = value;
  if (name === "firstName" || name === "lastName") {
    formattedValue = capitalize(value);
  }

  setFormData({
    ...formData,
    [name]: formattedValue,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (
    formData.firstName.trim() === "" ||
    formData.lastName.trim() === "" ||
    formData.email.trim() === "" ||
    formData.phoneNumber.trim() === "" ||
    formData.country.trim() === "" ||
    formData.gender.trim() === "" ||
    formData.commune.trim() === ""
  ) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (isNaN(formData.phoneNumber)) {
    alert("Le numéro de téléphone doit être numérique.");
    return;
  }

  updateUserData(formData);
  setShowConfirmation(true);
  setTimeout(() => {
    setShowConfirmation(false);
  }, 3000);
};

const formatBirthDate = (isoDate) => {
  if (!isoDate) return ""; // Handle case where date might be empty
  const dateParts = isoDate.split("-");
  if (dateParts.length !== 3) return ""; // Ensure ISO date format has three parts

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${day}/${month}/${year}`;
};


return (
  <form className="w-full mx-auto my-0 p-3 bg-white" onSubmit={handleSubmit}>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Prénom
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="field-content"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="field-content"
          required
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="field-content"
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Numéro de téléphone
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="field-content"
          required
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
          Date de naissance
        </label>
        <input
type="date"
id="birthDate"
name="birthDate"
value={formatBirthDate(formData.birthDate)}
onChange={handleInputChange}
className="field-content"
required
/>

      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Sexe
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="field-content"
          required
        >
          <option value="">-- Sélectionner --</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
          <option value="autre">Autre</option>
        </select>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Pays
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="field-content"
          required
        >
          <option value="" disabled>
            -- Sélectionner --
          </option>
          {/* Replace with your actual list of countries */}
          {liste_pays.map((pays) => (
            <option key={pays} value={pays.replace(/\s+/g, "-")}>
              {pays}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="commune" className="block text-sm font-medium text-gray-700">
          Commune/Ville
        </label>
        <input
          type="text"
          id="commune"
          name="commune"
          value={formData.commune}
          onChange={handleInputChange}
          className="field-content"
          required
        />
      </div>
    </div>
    {showConfirmation && (
      <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md shadow-sm">
        Modifications enregistrées avec succès.
      </div>
    )}
    <div className="mt-4 flex justify-end py-10">
      <button
        type="submit"
        className="classic-button"
        disabled={!formModified}
      >
        Enregistrer les modifications
      </button>
    </div>
  </form>
);
};

export default FormUser;

