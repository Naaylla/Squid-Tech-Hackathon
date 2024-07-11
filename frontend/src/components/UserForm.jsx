
import React, { useState, useEffect } from "react";
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
const FormUser = ({ initialData, updateUserData }) => {
  const [formData, setFormData] = useState(initialData);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formModified, setFormModified] = useState(false);

  useEffect(() => {
    const isFormModified =
      formData.firstName !== initialData.firstName ||
      formData.lastName !== initialData.lastName ||
      formData.email !== initialData.email ||
      formData.phoneNumber !== initialData.phoneNumber ||
      formData.country !== initialData.country ||
      formData.gender !== initialData.gender ||
      formData.address !== initialData.address;

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
      formData.address.trim() === ""
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (isNaN(formData.phoneNumber)) {
      alert("Le numéro de téléphone doit être numérique.");
      return;
    }

    const nameRegex = /^[a-zA-ZÀ-ÿ]+(?:-[a-zA-ZÀ-ÿ]+)?(?: [a-zA-ZÀ-ÿ]+(?:-[a-zA-ZÀ-ÿ]+)?)?$/;
    if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName)) {
      alert("Le prénom et le nom doivent contenir des caractères alphabétiques");
      return;
    }

    if (!formModified) {
      return;
    }

    updateUserData(formData);

    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <form className="w-full mx-auto my-0 p-3 bg-white" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-gray-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-gray-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Pays</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-gray-100"
          >
            <option value="" disabled>-- Sélectionner --</option>
            {liste_pays.map((pays) => (
              <option key={pays} value={pays.replace(/\s+/g, '-')}>{pays}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Sexe</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-gray-100"
            disabled
          >
            <option value="">-- Sélectionner --</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-gray-100"
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
          className="bg-teal-700 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 hover:bg-teal-500"
          disabled={!formModified}
        >
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
};

export default FormUser;